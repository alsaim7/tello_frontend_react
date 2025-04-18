import { useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export function AnimeForm() {

    const navigate = useNavigate()


    const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
    // const url = "http://127.0.0.1:8000/tello"
    const url = `${VITE_BASE_URL}/tello`
    console.log(url)

    const token = localStorage.getItem('token')
    const [formData, setFormData] = useState({
        anime_name: '',
        anime_description: ''
    })

    const [error, setError] = useState("")
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const addData = async (formData) => {
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                setLoading(false)
                navigate('/')
            }
        } catch (err) {
            setLoading(false)
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail)
            } else {
                setError("Something went wrong. Please try again.")
            }
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        if (!formData.anime_name || !formData.anime_description) {
            setLoading(false)
            setOpen(true)
            setError("Please fill both required fields!")
            return
        }

        // console.log(formData)

        addData(formData)
        setFormData({
            anime_name: '',
            anime_description: ''
        })
    }


    return (
        <>
            {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '50vh' }}>
                <CircularProgress size={70} color="#111827" />
            </Box>: 
                <div className="min-h-screen flex items-center justify-center py-10 px-2 sm:px-4">
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2.5,
                            maxWidth: { xs: '100%', sm: 500, md: 600 },
                            margin: '0 auto',
                            width: '100%',
                            padding: { xs: 2, sm: 4 },
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        {open === true ? <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error" onClose={() => { setOpen(false) }}>
                                {error}
                            </Alert>
                        </Stack> : null}

                        <Typography variant="h5" fontWeight="bold" textAlign="center">
                            Create Story
                        </Typography>
                        <TextField autoFocus id="outlined-basic" label="Story Title" variant="outlined" name="anime_name" value={formData.anime_name} onChange={handleChange} />
                        <TextField
                            id="outlined-multiline-static"
                            label="Story"
                            multiline
                            rows={8}
                            name="anime_description"
                            value={formData.anime_description}
                            onChange={handleChange}
                            placeholder="placeholder"
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ borderRadius: 2, py: 1.2, fontWeight: 'bold', width: '100%' }}
                        >
                            Submit
                        </Button>
                    </Box>
                </div>
                }         
        </>
    )
}