import SignUp from "./SignIn/SignUp"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export function RegisterForm() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
    // const registerURL = `http://127.0.0.1:8000/user`
    const registerURL = `${VITE_BASE_URL}/user`




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

        const registerUser = async (formData) => {

            try {
                const res = await axios.post(registerURL, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                // console.log(res)
                setLoading(false)
                navigate('/login')
            }

            catch (err) {
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

        registerUser(formData)

        setFormData({
            username: "",
            email: "",
            password: ""
        })
    }

    return (
        <>
            {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '50vh' }}>
                <CircularProgress size={70} color="#111827" />
            </Box> :
                <div>
                    <SignUp handleChange={handleChange} formData={formData} handleSubmit={handleSubmit} error={error} open={open} setOpen={setOpen} />
                </div>
            }
        </>
    )
}