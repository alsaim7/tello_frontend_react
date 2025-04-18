import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CardHeader from '@mui/material/CardHeader';
// import Avatar from '@mui/material/Avatar';
import Avatar from "boring-avatars";
import Divider from '@mui/material/Divider';

import { Link } from "react-router-dom";

import { DeleteForm } from "./DeleteForm";

import { useNavigate } from "react-router-dom";

import { FullPostSkeleton } from "./Skeleton";

export function FullPost({ currentUser }) {
    const { id } = useParams()
    const [postDetails, setPostDetails] = useState({})
    const [error, setError]= useState('')

    const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
    // const postDetailsURL = `http://127.0.0.1:8000/tello/${id}`
    const postDetailsURL = `${VITE_BASE_URL}/tello/${id}`



    const navigate = useNavigate()

    const [skeleton, setSkeleton] = useState(true)

    const fetchPostDetails = async () => {
        try {
            const res = await axios.get(postDetailsURL, {
                'headers': {
                    'Content-Type': 'application/json'
                }
            })
            // console.log(res.data)
            setPostDetails(res.data)
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
        fetchPostDetails()
    }, [])

    return (
        <>
        {skeleton? <FullPostSkeleton/>: 
                <div className="flex justify-center px-4 py-10">
                    <Card
                        sx={{
                            maxWidth: 800,
                            width: '100%',
                            boxShadow: 6,
                            borderRadius: 3,
                            px: { xs: 1.5, sm: 3 },
                            py: { xs: 2, sm: 3 },
                            bgcolor: '#fff'
                        }}
                    >
                        <CardHeader sx={{ pt: 2, pb: 2 }}
                            avatar={

                                <Avatar
                                    size={50}
                                    name={postDetails?.author?.username}
                                    variant="beam"
                                    square={false}
                                    onClick={() => navigate(`/profile/${postDetails.author.id}`)}
                                    style={{ cursor: 'pointer' }}
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
                                    fontWeight={600}
                                    sx={{
                                        fontSize: { xs: '1rem', sm: '1.15rem', md: '1.2rem', cursor: 'pointer' }
                                    }}
                                    onClick={() => navigate(`/profile/${postDetails.author.id}`)}
                                >
                                    {postDetails?.author?.username}
                                </Typography>
                            }
                            subheader={
                                <Typography
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '0.95rem' }
                                    }}
                                >
                                    {postDetails?.author?.email}
                                </Typography>
                            }
                        />
                        <Divider sx={{ mb: 1 }} />
                        <CardContent sx={{ px: { xs: 1, sm: 3 }, py: { xs: 1.5, sm: 2 } }}>
                            <Typography
                                fontWeight={700}
                                sx={{
                                    fontSize: { xs: '1.4rem', sm: '1.9rem', md: '2rem' },
                                    mb: { xs: 1, sm: 1.5 }
                                }}
                            >
                                {postDetails?.anime_name}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.secondary',
                                    mt: { xs: 0.5, sm: 1.2 },
                                    mb: { xs: 1.5, sm: 2 },
                                    mx: { xs: 0.5, sm: 2 },
                                    lineHeight: 1.8,
                                    whiteSpace: 'pre-line',
                                    textAlign: 'justify',
                                    fontSize: { xs: '0.95rem', sm: '1rem' }
                                }}
                            >
                                {postDetails?.anime_description}
                            </Typography>
                        </CardContent>
                        {currentUser && currentUser.username === postDetails?.author?.username ?
                            <CardActions sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                <Link to={`/update/${postDetails.id}`}><Button size="small" variant="outlined" color="primary" sx={{ px: 3 }}>Edit</Button></Link>
                                <DeleteForm id={postDetails.id} />
                            </CardActions>
                            : null}

                    </Card>
                </div>
                }
        
        </>
    )
}