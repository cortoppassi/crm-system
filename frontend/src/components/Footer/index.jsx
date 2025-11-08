import { Box, Typography, Button, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'

export default function Footer() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <Box
            sx={{
                width: '100%',
                mt: 'auto',
                py: 2,
                px: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderTop: '1px solid rgba(0,0,0,0.1)',
                backgroundColor: '#fafafa',
                position: 'relative',
            }}
        >
            <IconButton
                onClick={handleLogout}
                color="error"
                sx={{ position: 'absolute', left: 16 }}
            >
                <LogoutIcon />
            </IconButton>

            <Typography variant="body2" color="text.secondary" textAlign="center">
                © {new Date().getFullYear()} CRM System — Desenvolvido por Jonathan Cortoppassi
            </Typography>
        </Box>
    )

}
