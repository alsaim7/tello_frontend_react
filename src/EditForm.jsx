import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import { EditFormSkeleton } from "./Skeleton";
import CircularProgress from '@mui/material/CircularProgress';

export function EditForm() {
    const { id } = useParams()


    const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
    // const urlForEdit = `http://127.0.0.1:8000/tello/${id}`
    const urlForEdit = `${VITE_BASE_URL}/tello/${id}`


    const [formData, setFormData] = useState({})
    const [submitStatus, setSubmitStatus] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const [error, setError] = useState("")
    const [open, setOpen] = useState(false)
    const [skeleton, setSkeleton] = useState(true)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            const res = await fetch(urlForEdit)
            const resJson = await res.json()
            setFormData(resJson)
            setSkeleton(false)
        } catch (err) {
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail)
            } else {
                setError("Something went wrong. Please try again.")
            }
        }
    }
    useEffect(() => {
        fetchData()
    }, [urlForEdit])


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const addData = async (formData) => {
        try {
            const res = await fetch(urlForEdit, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                setLoading(false)
                navigate(`/profile/${formData.author.id}`)
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
            setError("Please fill both rwquired fields!")
            return
        }
        // console.log(formData)
        addData(formData)
        setSubmitStatus(false)
    }

    return (
        <>
            {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '50vh' }}>
                <CircularProgress size={70} color="#111827" />
            </Box> :
                <div className="min-h-screen flex items-center justify-center py-10 px-2 sm:px-4">
                    {/* {submitStatus === true ? <Alert severity="success">Updated Successfully!!!</Alert>: null} */}

                    {skeleton ? <EditFormSkeleton /> :
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
                                Update your story
                            </Typography>
                            <TextField autoFocus id="outlined-basic" label="" variant="outlined" name="anime_name" value={formData.anime_name || ""} onChange={handleChange} required />
                            <TextField
                                id="outlined-multiline-static"
                                label=""
                                multiline
                                rows={8}
                                name="anime_description"
                                value={formData.anime_description || ""}
                                onChange={handleChange}
                                required
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ borderRadius: 2, py: 1.2, fontWeight: 'bold', width: '100%' }}
                            >
                                Submit
                            </Button>
                        </Box>
                    }

                </div>
            }
        </>
    )
}