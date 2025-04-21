import { useState, useEffect } from "react"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import 'boxicons'
import { useNavigate } from "react-router-dom";
import { AnimeListSkeleton } from "./Skeleton";
import { Footer } from "./Footer";

import { Search } from "./Search";
import { CircularProgress, Box, Stack, Alert } from "@mui/material";

import Avatar from "boring-avatars";


export function AnimeList() {

    const [animeList, setAnimeList] = useState([])
    const [loader, setLoader] = useState(false)

    const [error, setError] = useState()
    const [open, setOpen] = useState(false)

    const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
    // const url = "http://127.0.0.1:8000/tello"
    const url = `${VITE_BASE_URL}/tello`
    // console.log(VITE_BASE_URL)

    const navigate= useNavigate()
    const fetchData = async () => {
        try{
            const res = await fetch(url)
            const resJson = await res.json()
            setAnimeList(resJson)
        }catch(err){
            if (err.response && err.response.data && err.response.data.detail) {
                console.error(err.response.data.detail)
            } else {
                console.error("Something went wrong. Please try again.")
            }
        }
        
    }
    useEffect(() => {
        fetchData()
    }, [])



    return (
        <>

            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">

                {open === true ? <Stack sx={{ width: '100%', mb: 2 }} spacing={2}>
                    <Alert severity="error" onClose={() => { setOpen(false) }}>
                        {error}
                    </Alert>
                </Stack> : null}

                <Search setLoader={setLoader} setError={setError} setOpen={setOpen}/>
                {loader ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '50vh' }}>
                    <CircularProgress size={70} color="#111827" />
                </Box> :
                    <>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 tracking-tight">Story List</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {animeList.length === 0
                                ? Array.from(new Array(6)).map((_, i) => <AnimeListSkeleton key={i} />)
                                : animeList.slice().reverse().map((anime, i) => {
                                    return (

                                        <Card
                                            className="bg-white"
                                            key={i}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '100%',
                                                borderRadius: 3,
                                                boxShadow: 2,
                                                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                                '&:hover': {
                                                    transform: 'translateY(-4px)',
                                                    boxShadow: 4
                                                }
                                            }}
                                        >
                                            <CardContent onClick={() => navigate(`/fullpost/${anime?.id}`)} sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, cursor: 'pointer' }}>
                                                <Typography
                                                    gutterBottom
                                                    variant="h6"
                                                    component="div"
                                                    sx={{
                                                        fontWeight: 'medium',
                                                        fontSize: { xs: '1.125rem', sm: '1.25rem' },
                                                        color: 'text.primary'
                                                    }}
                                                >
                                                    {anime?.anime_name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                                                        lineHeight: 1.6
                                                    }}
                                                >
                                                    {anime?.anime_description?.length > 100
                                                        ? `${anime.anime_description.substring(0, 100)}...`
                                                        : anime.anime_description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions
                                                sx={{
                                                    p: { xs: 2, sm: 3 },
                                                    pt: 0,
                                                    justifyContent: 'space-between',
                                                    borderTop: 1,
                                                    borderColor: 'divider',
                                                    alignItems: 'center'
                                                }}
                                            >

                                                <Link to={`/fullpost/${anime?.id}`}><Button
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{
                                                        borderRadius: 2,
                                                        textTransform: 'none',
                                                        fontWeight: 'medium'
                                                    }}
                                                >View Full</Button></Link>

                                                <Link
                                                    to={`/profile/${anime?.author?.id}`}
                                                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
                                                >
                                                    <Avatar
                                                        size={25}
                                                        name={anime?.author?.username}
                                                        variant="beam"
                                                        colors={
                                                            [
                                                                "#FF6B6B", // Soft Red
                                                                "#6BCB77", // Fresh Green
                                                                "#4D96FF", // Cool Blue
                                                                "#FFD93D", // Bright Yellow
                                                                "#FF6F91", // Pinkish Red
                                                                "#845EC2", // Deep Purple
                                                                "#00C9A7", // Teal
                                                                "#F9A826", // Warm Orange
                                                                "#2C73D2", // Royal Blue
                                                                "#D65DB1", // Light Magenta
                                                                "#0081CF", // Sky Blue
                                                                "#FFC75F", // Sunflower
                                                                "#B0A8B9", // Cool Gray
                                                                "#FF9671", // Coral
                                                                "#7C83FD"  // Indigo Blue
                                                            ]
                                                        }
                                                    />
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            ml: 0.5,
                                                            fontWeight: 'bold',
                                                            fontSize: { xs: '0.875rem', sm: '0.9375rem' }
                                                        }}
                                                    >
                                                        {anime?.author?.username}
                                                    </Typography>
                                                </Link>

                                            </CardActions>


                                        </Card>

                                    )
                                })}
                        </div>


                    </>
                }
            </div>


            <Footer />

        </>
    )
}