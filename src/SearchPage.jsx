import { useLocation } from "react-router-dom"

import { useState } from "react";

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

import { CircularProgress, Box, Stack, Alert} from "@mui/material";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function SearchPage() {
    const location = useLocation()
    const searchResult = location.state.result
    const searchData = location.state.searchData
    // console.log(searchResult)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState()
    const [open, setOpen] = useState(false)

    const navigate= useNavigate()

    return (
        <>
            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">

                {open === true ? <Stack sx={{ width: '100%', mb:2 }} spacing={2}>
                    <Alert severity="error" onClose={() => { setOpen(false) }}>
                        {error}
                    </Alert>
                </Stack> : null}

               <Search setLoader={setLoader} setError={setError} setOpen={setOpen} />
                {loader ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '50vh' }}>
                    <CircularProgress size={70} color="#111827" />
                </Box> :
                    <>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-6 text-gray-800 tracking-tight">
                            <ArrowBackIcon
                                onClick={() => navigate('/')}
                                sx={{
                                    cursor: 'pointer',
                                    fontSize: { xs: 15, sm: 20, md: 25 },
                                    color: 'text.primary',
                                    fontWeight: 'bold',
                                    transform: 'translateY(-1.5px)', 
                                    marginRight: 1,
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translate(-0.3rem, -1.5px)'
                                    }
                                }}
                            /> Search results for "{searchData}"
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {searchResult.length === 0
                                ? Array.from(new Array(6)).map((_, i) => <AnimeListSkeleton key={i} />)
                                : searchResult.slice().reverse().map((anime, i) => {
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
                                                    {anime.anime_name}
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
                                                        ? `${anime?.anime_description?.substring(0, 100)}...`
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
                                                    <box-icon name='user-circle' type='solid' size="sm"></box-icon>
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