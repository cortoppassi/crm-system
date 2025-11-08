import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/login'
import Clients from '../pages/clients'
import Contacts from '../pages/contacts'
import Report from '../pages/report'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/contacts/:clientId" element={<Contacts />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  )
}
