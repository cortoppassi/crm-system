import { useState } from 'react'
import { Box, Button, TextField, Typography, Link, Paper } from '@mui/material'
import { useForm } from 'react-hook-form'

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (data) => {
        console.log('Login:', data)
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box
                sx={{
                    flex: 1,
                    backgroundImage:
                        'url(https://picsum.photos/1200/900)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f9fafb',
                }}
            >
                <Paper elevation={3} sx={{ p: 5, width: '80%', maxWidth: 400 }}>
                    <Typography variant="h5" textAlign="center" fontWeight="bold" mb={3}>
                        Acesso ao Sistema
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="E-mail"
                            type="email"
                            fullWidth
                            margin="normal"
                            {...register('email', {
                                required: 'E-mail é obrigatório',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Formato de e-mail inválido',
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors?.email?.message}
                        />

                        <TextField
                            label="Senha"
                            type="password"
                            fullWidth
                            margin="normal"
                            {...register('password', { required: 'Senha obrigatória' })}
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2, py: 1.2 }}
                        >
                            Entrar
                        </Button>

                        <Typography variant="body2" align="center" mt={3}>
                            Ainda não tem conta?{' '}
                            <Link
                                href="#"
                                underline="hover"
                                sx={{ fontWeight: 500, color: 'primary.main' }}
                            >
                                Clique aqui
                            </Link>
                        </Typography>
                    </form>
                </Paper>
            </Box>
        </Box>
    )
}
