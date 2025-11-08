import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import Login from '../pages/login'
import Clients from '../pages/clients'
import Contacts from '../pages/contacts'
import Report from '../pages/report'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PrivateRoute from '../components/PrivateRoute'

function Layout() {
    const location = useLocation()
    const isLoginPage = location.pathname === '/'

    if (isLoginPage) {
        return (
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        )
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <Navbar />

            <Box
                component="main"
                sx={{
                    flex: 1,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2,
                    backgroundColor: '#f9f9f9',
                }}
            >
                <Routes>
                    <Route path="/clients" element={
                        <PrivateRoute>
                            <Clients />
                        </PrivateRoute>
                    } />
                    <Route path="/contacts/:clientId" element={
                        <PrivateRoute>
                            <Contacts />
                        </PrivateRoute>
                    } />
                    <Route path="/report" element={
                        <PrivateRoute>
                            <Report />
                        </PrivateRoute>
                    } />
                </Routes>
            </Box>

            <Footer />
        </Box>
    )
}

export default function Router() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    )
}
