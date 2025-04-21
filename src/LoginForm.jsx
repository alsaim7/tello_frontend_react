import { useState, useEffect } from "react"
import axios from 'axios'
import SignIn from './SignIn/SignIn.jsx'
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';

import CircularProgress from '@mui/material/CircularProgress';

export function LoginForm({ setCurrentUser }) {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
    // const loginURL = `http://127.0.0.1:8000/login`
    // const currentUserURL = 'http://127.0.0.1:8000/user/me'
    const loginURL = `${VITE_BASE_URL}/login`
    const currentUserURL = `${VITE_BASE_URL}/user/me`





    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        // Basic frontend validation
        if (!formData.username.trim() || !formData.password.trim()) {
            setLoading(false)
            setOpen(true)
            setError("Please enter both username and password")
            return
        }
        const loginUser = async (formData) => {
            try {
                const res = await axios.post(loginURL, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                // console.log(res)
                const { access_token } = res.data
                localStorage.setItem('token', access_token)
                setError("") // Clear error if success

                const token = access_token  // <-- define token here
                if (token) {
                    try {
                        const res = await axios.get(currentUserURL, {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            }
                        })
                        setCurrentUser(res.data)
                        // console.log(res.data.username)
                    } catch (error) {
                        console.error("Failed to fetch user:", error)
                    }
                }

                setLoading(false)
                navigate('/')
            } catch (err) {
                setLoading(false)
                if (err.response && err.response.data && err.response.data.detail) {
                    setOpen(true)
                    setError(err.response.data.detail)
                } else {
                    setOpen(true)
                    setError("Something went wrong. Please try again.")
                }
            }
        }

        loginUser(formData)

        setFormData({
            username: "",
            password: ""
        })
    }




    return (
        <>
            {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '50vh'}}>
                <CircularProgress size={70} color="#111827"/>
            </Box> :
                <div>
                    <SignIn handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} error={error} open={open} setOpen={setOpen} />
                </div>
                }
        </>
    )
}