import { useState } from 'react'
import { Box, Button, TextField, Typography, Link, Paper, Snackbar, Alert } from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../UserContext';

export default function Login() {
    const [isRegister, setIsRegister] = useState(false)
    const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' })
    const navigate = useNavigate()
    const { setUser } = useUser();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()
    const password = watch('password')

    const onSubmit = async (data) => {
        try {
            if (isRegister) {
                const res = await axios.post('http://localhost:3000/api/auth/register', {
                    email: data.email,
                    password: data.password,
                })
                localStorage.setItem('token', res.data.token)
                setSnack({ open: true, message: 'Cadastro realizado! Faça login agora.', severity: 'success' })
                setIsRegister(false)
                reset()
            } else {
                const res = await axios.post('http://localhost:3000/api/auth/login', {
                    email: data.email,
                    password: data.password,
                })
                localStorage.setItem('token', res.data.token)
                setUser(res.data);
                setSnack({ open: true, message: 'Login realizado com sucesso!', severity: 'success' })
                navigate('/clients')
            }
        } catch (err) {
            setSnack({
                open: true,
                message: err.response?.data?.message || 'Erro ao processar',
                severity: 'error',
            })
        }
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh', flexDirection: { xs: 'column', md: 'row' } }}>
            <Box
                sx={{
                    flex: 1,
                    backgroundImage: 'url(/login-background.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(2px)',
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
                    <Typography
                        variant="h5"
                        textAlign="center"
                        fontWeight="bold"
                        mb={3}
                    >
                        {isRegister ? 'Criar Conta' : 'Acesso ao Sistema'}
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

                        {isRegister && (
                            <TextField
                                label="Confirmar Senha"
                                type="password"
                                fullWidth
                                margin="normal"
                                {...register('confirmPassword', {
                                    required: 'Confirmação obrigatória',
                                    validate: (value) =>
                                        value === password || 'As senhas não conferem',
                                })}
                                error={!!errors.confirmPassword}
                                helperText={errors?.confirmPassword?.message}
                            />
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2, py: 1.2 }}
                        >
                            {isRegister ? 'Cadastrar' : 'Entrar'}
                        </Button>

                        <Typography variant="body2" align="center" mt={3}>
                            {isRegister ? 'Já tem conta?' : 'Ainda não tem conta?'}{' '}
                            <Link
                                href="#"
                                underline="hover"
                                onClick={(e) => {
                                    e.preventDefault()
                                    reset()
                                    setIsRegister((prev) => !prev)
                                }}
                                sx={{ fontWeight: 500, color: 'primary.main' }}
                            >
                                {isRegister ? 'Fazer login' : 'Clique aqui'}
                            </Link>
                        </Typography>
                    </form>
                </Paper>
            </Box>

            <Snackbar
                open={snack.open}
                autoHideDuration={4000}
                onClose={() => setSnack({ ...snack, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity={snack.severity} variant="filled" onClose={() => setSnack({ ...snack, open: false })}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
