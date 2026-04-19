import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { ThemeContext } from './context/ThemeContext'

function App() {
  const [loading, setLoading] = useState(true)
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const dispatch = useDispatch()

  const toggleDark = () => {
    setDark(prev => {
      localStorage.setItem('theme', !prev ? 'dark' : 'light')
      return !prev
    })
  }

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData: { $id: userData.$id, name: userData.name, email: userData.email } }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      <div className={dark ? 'dark' : ''}>
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}>
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
