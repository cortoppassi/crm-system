import { AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const showBackButton = location.pathname !== '/'

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#6a1b9a',
        boxShadow: 'none',
        mb: 2,
      }}
    >
      <Toolbar>
        {showBackButton && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{ mr: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
          CRM System
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
