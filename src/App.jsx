import './App.css'
import { AnimeList } from './AnimeList'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EditForm } from './EditForm';
import { AnimeForm } from './AnimeForm';
import { Navbar } from './Navbar';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { UserProfile } from './UserProfile';
import { FullPost } from './FullPost';
import { SearchPage } from './SearchPage';
import {ScrollToTop} from './ScrollToTop';

function App() {

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
    // const currentUserURL = `http://127.0.0.1:8000/user/me`
    const currentUserURL = `${VITE_BASE_URL}/user/me`


    const getCurrentUser = async () => {
      if (token) {
        try {
          const res = await axios.get(currentUserURL, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          })
          setCurrentUser(res?.data)
          // console.log(res.data.username)
        } catch (error) {
          console.error("Failed to fetch user:", error)
        }
      }
    }

    getCurrentUser()
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={<AnimeList currentUser={currentUser} />} />
          <Route path='/create' element={<AnimeForm />} />
          <Route path='/update/:id' element={<EditForm />} />
          <Route path='/login' element={<LoginForm setCurrentUser={setCurrentUser}/>} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/profile/:id' element={<UserProfile currentUser={currentUser} />} />
          <Route path='/fullpost/:id' element={<FullPost currentUser={currentUser} /> } />
          <Route path='/search' element={<SearchPage /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App