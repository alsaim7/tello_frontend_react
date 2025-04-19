import axios from "axios"
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from 'boring-avatars'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { DeleteForm } from "./DeleteForm"

import { UserProfileSkeleton } from "./Skeleton";

export function UserProfile({ currentUser }) {
    const { id } = useParams()
    const [userDetails, setUserDetails] = useState({})


    const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
    // const getUserDetailsURL = `http://127.0.0.1:8000/user/${id}`
    const getUserDetailsURL = `${VITE_BASE_URL}/user/${id}`



    const [skeleton, setSkeleton] = useState(true)

    const fetchUserDetails = async () => {
        try {
            const res = await axios.get(getUserDetailsURL, {
                'headers': {
                    'Content-Type': 'application/json'
                }
            });
            // console.log(res.data)
            setUserDetails(res.data)
            setSkeleton(false)
        } catch(err) {
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail)
            } else {
                setError("Something went wrong. Please try again.")
            }
        }

    }

    useEffect(() => {
        fetchUserDetails()
    }, [])


    return (
        <>
            {skeleton ? <UserProfileSkeleton /> :
                <div className="min-h-screen bg-gray-100">
                    <Card className='transition-all duration-300 hover:shadow-lg' sx={{
                        maxWidth: { xs: '100%', sm: 500 },
                        mx: 'auto',
                        mb: 6,
                        boxShadow: 3,
                        borderRadius: 4,
                        bgcolor: 'white',
                        mt: 2
                    }}>
                        <CardHeader

                            avatar={

                                <Avatar
                                    size={50}
                                    name={userDetails?.username}
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
                            }

                            title={
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                                        fontWeight: 'bold',
                                        color: 'text.primary'
                                    }}
                                >
                                    {userDetails?.username}
                                </Typography>
                            }
                            subheader={
                                <Typography
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }}
                                >
                                    {userDetails?.email}
                                </Typography>
                            }
                            sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 3 } }}
                        />
                    </Card>

                    <div className="container mx-auto px-4">
                        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">{userDetails?.username?.[0].toUpperCase() + userDetails?.username?.slice(1)}'s Stories</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                            {userDetails?.anime_list?.slice().reverse().map((anime, i) => {
                                return (

                                    <Card className="bg-white" sx={{
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
                                        key={i}>
                                        <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                                            <Typography
                                                variant="h6"
                                                component="div"
                                                sx={{
                                                    fontWeight: 'medium',
                                                    mb: 2,
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
                                                {anime.anime_description?.length > 150
                                                    ? `${anime.anime_description.substring(0, 150)}...`
                                                    : anime.anime_description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions className="flex justify-between mt-auto" sx={{
                                            p: { xs: 2, sm: 3 },
                                            pt: 0,
                                            justifyContent: 'space-between',
                                            borderTop: 1,
                                            borderColor: 'divider'
                                        }}>

                                            {currentUser && currentUser.username === userDetails?.username ? <Link to={`/update/${anime.id}`}><Button size="small">Edit</Button></Link> : null}


                                            <Link to={`/fullpost/${anime.id}`}><Button size="small">View Full</Button></Link>


                                            {currentUser && currentUser.username === userDetails?.username ? <DeleteForm id={anime.id} fetchUserDetails={fetchUserDetails} /> : null}


                                        </CardActions>

                                    </Card>

                                )
                            })}
                        </div>
                    </div>

                </div>
            }

        </>
    )
}