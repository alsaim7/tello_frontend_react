import { Skeleton, Card, CardContent, CardActions, Box } from '@mui/material';

export function AnimeListSkeleton() {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                borderRadius: 3,
                boxShadow: 2,
                p: 2
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Skeleton variant="text" width="80%" height={30} />
                <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1 }} />
                <Skeleton variant="text" width="95%" height={20} />
                <Skeleton variant="text" width="90%" height={20} />
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
                <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Skeleton variant="circular" width={24} height={24} />
                    <Skeleton variant="text" width={60} height={20} />
                </Box>
            </CardActions>
        </Card>
    );
}


// EditFormSkeleton.jsx

import Stack from '@mui/material/Stack';

export function EditFormSkeleton() {
    return (
        <div className="min-h-screen flex items-center justify-center py-10 px-2 sm:px-4">
            <Box
                sx={{
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
            >
                <Skeleton variant="text" height={40} width="60%" sx={{ mx: 'auto' }} />
                <Skeleton variant="rectangular" height={56} width={500}/>
                <Skeleton variant="rectangular" height={160} />
                <Skeleton variant="rectangular" height={45} sx={{ borderRadius: 2 }} />
            </Box>
        </div>
    );
}


// FullPostSkeleton.jsx
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

export function FullPostSkeleton() {
    return (
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
                <CardHeader
                    avatar={
                        <Skeleton variant="circular" width={50} height={50} />
                    }
                    title={
                        <Skeleton variant="text" width="40%" height={30} />
                    }
                    subheader={
                        <Skeleton variant="text" width="60%" height={20} />
                    }
                />
                <Divider sx={{ mb: 1 }} />
                <CardContent sx={{ px: { xs: 1, sm: 3 }, py: { xs: 1.5, sm: 2 } }}>
                    <Skeleton variant="text" width="80%" height={40} sx={{ mb: 2 }} />
                    <Box sx={{ mx: { xs: 0.5, sm: 2 } }}>
                        <Skeleton variant="rectangular" width="100%" height={150} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" width="100%" height={100} />
                    </Box>
                </CardContent>
                <CardActions sx={{ mt: 2, justifyContent: 'flex-end', gap: 2 }}>
                    <Skeleton variant="rectangular" width={80} height={36} />
                    <Skeleton variant="rectangular" width={80} height={36} />
                </CardActions>
            </Card>
        </div>
    );
}




export function UserProfileSkeleton() {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top User Info Skeleton */}
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
                        <Skeleton variant="circular" width={50} height={50} />
                    }
                    title={
                        <Skeleton variant="text" width="60%" height={28} />
                    }
                    subheader={
                        <Skeleton variant="text" width="40%" height={20} />
                    }
                    sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 3 } }}
                />
            </Card>

            {/* Anime Cards Skeletons */}
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
                    <Skeleton variant="text" width="30%" sx={{ mx: 'auto' }} />
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                    {[1, 2].map((_, index) => (
                        <Card key={index} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            borderRadius: 3,
                            boxShadow: 2,
                            p: 2
                        }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Skeleton variant="text" width="80%" height={24} />
                                <Skeleton variant="text" width="100%" height={20} />
                                <Skeleton variant="text" width="90%" height={20} />
                                <Skeleton variant="text" width="95%" height={20} />
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between' }}>
                                <Skeleton variant="rectangular" width={60} height={30} />
                                <Skeleton variant="rectangular" width={60} height={30} />
                            </CardActions>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

