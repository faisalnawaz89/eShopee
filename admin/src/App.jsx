import { useState } from 'react'
import './Components/GlobalStyle/GlobalStyle.css'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Components/Pages/Admin/Admin'
import Login from './Components/Login/login'
//eShopee Admin Page
export default function App() {
  const [user, setUser] = useState(true)
  return (
    <>
      {!user ? <> <Navbar/> <Admin/> </> : <Login/>}
    </>
  )
}




