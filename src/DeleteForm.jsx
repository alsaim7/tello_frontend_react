import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export function DeleteForm({ id, fetchData, fetchUserDetails }) {

    const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
    // const urlID = `http://127.0.0.1:8000/tello/${id}`
    const urlID = `${VITE_BASE_URL}/tello/${id}`



    const token = localStorage.getItem('token')
    const navigate= useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const deleteData = async () => {
            try {
                const res = await fetch(urlID, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

                if (res.ok) {
                    if (fetchData) fetchData()
                    if (fetchUserDetails) fetchUserDetails()
                    const data = await res.json()
                    // console.log(data)
                    navigate('/')
                } else {
                    const errorData = await res.json()
                    console.error("Delete failed:", errorData)
                    alert("Failed to delete item.")
                }
            } catch (error) {
                console.error("Error while deleting:", error)
                alert("An error occurred. Please try again.")
            }
        }
        deleteData()
    }
    return (
        <form onSubmit={handleSubmit}>
            <button
                className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition-all duration-200 text-sm font-medium shadow-sm"
            >
                Delete
            </button>
        </form>
    )
}