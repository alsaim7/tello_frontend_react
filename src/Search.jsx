import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export function Search({setLoader, setError, setOpen}) {
    const [searchData, setSearchData] = useState('')
    const navigate = useNavigate()
    const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
    const searchURL = `${VITE_BASE_URL}/tello/q?search=${encodeURIComponent(searchData)}`

    // const [loader, setLoader]= useState(false)

    const handleChange = (e) => {
        const value = e.target.value
        setSearchData(value)
    }

    const searchAxios = async () => {
        try {
            const res = await axios.get(searchURL)
            const data = res?.data
            setLoader(false)
            navigate('/search', { state: { result: data, searchData: searchData } })
        } catch (err) {
            setLoader(false)
            if (err.response && err.response.data && err.response.data.detail) {
                setOpen(true)
                setError(err.response.data.detail)
            } else {
                setOpen(true)
                setError("Something went wrong. Please try again.")
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!searchData.trim()){
            return
        }
        setLoader(true)
        searchAxios()
        // setSearchData('')
    }

    return (
        <>
            <Paper
                component="form"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: {
                        xs: '90%',  // for mobile screens
                        sm: '400px', // for small tablets
                        md: '600px', // for medium screens
                        lg: '700px'  // for large screens and up
                    },
                    borderRadius: '9999px'
                }}
                onSubmit={handleSubmit}
                className="mx-auto mb-5"
            >

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Seek the stories untold..."
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={handleChange}
                    name="search"
                    value={searchData}
                />

                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon/>
                </IconButton>
            </Paper>
        </>
    )
}