import { Box, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        mt: 'auto',
        py: 2,
        textAlign: 'center',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: '#fafafa',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} CRM System — Desenvolvido por Jonathan Cortoppassi
      </Typography>
    </Box>
  )
}
