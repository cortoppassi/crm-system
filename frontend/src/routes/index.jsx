import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Login from '../pages/login'
import Clients from '../pages/clients'
import Contacts from '../pages/contacts'
import Report from '../pages/report'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Router() {
  return (
    <BrowserRouter>
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
            <Route path="/" element={<Login />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/contacts/:clientId" element={<Contacts />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </BrowserRouter>
  )
}
