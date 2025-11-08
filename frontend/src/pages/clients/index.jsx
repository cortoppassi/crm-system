import { useEffect, useState } from 'react'
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Pagination,
    InputAdornment,
    Avatar,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import SearchIcon from '@mui/icons-material/Search'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Clients() {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [editingClient, setEditingClient] = useState(null)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [clientToDelete, setClientToDelete] = useState(null)
    const navigate = useNavigate()

    const MOCK_CLIENTS = [
        { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '11999990001', data_registro: '2025-10-01' },
        { id: 2, nome: 'Maria Oliveira', email: 'maria@email.com', telefone: '11999990002', data_registro: '2025-10-02' },
        { id: 3, nome: 'Carlos Santos', email: 'carlos@email.com', telefone: '11999990003', data_registro: '2025-10-03' },
        { id: 4, nome: 'Ana Souza', email: 'ana@email.com', telefone: '11999990004', data_registro: '2025-10-04' },
        { id: 5, nome: 'Paulo Lima', email: 'paulo@email.com', telefone: '11999990005', data_registro: '2025-10-05' },
        { id: 6, nome: 'Fernanda Costa', email: 'fernanda@email.com', telefone: '11999990006', data_registro: '2025-10-06' },
        { id: 7, nome: 'Bruno Rocha', email: 'bruno@email.com', telefone: '11999990007', data_registro: '2025-10-07' },
        { id: 8, nome: 'Carla Mendes', email: 'carla@email.com', telefone: '11999990008', data_registro: '2025-10-08' },
        { id: 9, nome: 'Eduardo Reis', email: 'eduardo@email.com', telefone: '11999990009', data_registro: '2025-10-09' },
        { id: 10, nome: 'Juliana Martins', email: 'juliana@email.com', telefone: '11999990010', data_registro: '2025-10-10' },
    ]

    //   const fetchClients = async () => {
    //     try {
    //       setLoading(true)
    //       const res = await axios.get(`http://localhost:3000/clients`, {
    //         params: { page, search },
    //       })
    //       setClients(res.data.clients || [])
    //       setTotalPages(res.data.totalPages || 1)
    //     } catch (err) {
    //       console.error(err)
    //       setClients([])
    //     } finally {
    //       setLoading(false)
    //     }
    //   }
    const fetchClients = async () => {
        setLoading(true)

        setTimeout(() => {
            let filtered = MOCK_CLIENTS

            if (search) {
                filtered = filtered.filter((c) =>
                    c.nome.toLowerCase().includes(search.toLowerCase()) ||
                    c.email.toLowerCase().includes(search.toLowerCase())
                )
            }

            const perPage = 4
            const start = (page - 1) * perPage
            const paginated = filtered.slice(start, start + perPage)

            setClients(paginated)
            setTotalPages(Math.ceil(filtered.length / perPage))
            setLoading(false)
        }, 800)
    }

    const handleOpenDeleteModal = (client) => {
        setClientToDelete(client)
        setOpenDeleteModal(true)
    }

    const handleConfirmDelete = () => {
        if (clientToDelete) {
            setClients(clients.filter(c => c.id !== clientToDelete.id))
        }
        setOpenDeleteModal(false)
        setClientToDelete(null)
    }

    const handleCancelDelete = () => {
        setOpenDeleteModal(false)
        setClientToDelete(null)
    }

    const onSubmit = async (data) => {
        if (editingClient) {
            const updated = clients.map((c) =>
                c.id === editingClient.id ? { ...c, ...data } : c
            )
            setClients(updated)
            setEditingClient(null)
        } else {
            const newClient = {
                id: Date.now(),
                ...data,
                data_registro: new Date().toISOString().split('T')[0],
            }
            setClients([...clients, newClient])
        }

        reset()

    }

    const handleEdit = (client) => {
        setEditingClient(client)
        setValue('nome', client.nome)
        setValue('email', client.email)
        setValue('telefone', client.telefone)
    }

    useEffect(() => {
        fetchClients()
    }, [page, search])

    return (
        <Box sx={{ display: 'flex', height: '100vh', gap: 2, p: 3, backgroundColor: '#f9fafb' }}>
            <Paper sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ position: 'relative', mb: 2 }}>
                    <Avatar
                        alt="Avatar padrão"
                        src="https://i.pravatar.cc/150?img=2"
                        sx={{ width: 100, height: 100 }}
                    />
                    <IconButton
                        size="small"
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            bgcolor: 'white',
                            border: '1px solid #ccc',
                            '&:hover': { bgcolor: '#f0f0f0' },
                        }}
                    >
                        <AddPhotoAlternateIcon fontSize="small" color="action" />
                    </IconButton>
                </Box>


                <Typography variant="h5" textAlign="center" fontWeight="bold" mb={3}>
                    {editingClient ? 'Editar Cliente' : 'Cadastrar Cliente'}
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <TextField
                        label={editingClient ? '' : 'Nome completo'}
                        fullWidth
                        margin="normal"
                        {...register('nome', { required: 'Nome é obrigatório' })}
                        error={!!errors.nome}
                        helperText={errors?.nome?.message}
                    />

                    <TextField
                        label={editingClient ? '' : 'E-mail'}
                        type="email"
                        fullWidth
                        margin="normal"
                        {...register('email', { required: 'E-mail é obrigatório' })}
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                    />

                    <TextField
                        label={editingClient ? '' : 'Telefone'}
                        fullWidth
                        margin="normal"
                        {...register('telefone', { required: 'Telefone é obrigatório' })}
                        error={!!errors.telefone}
                        helperText={errors?.telefone?.message}
                    />

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        {editingClient ? 'Editar Cliente' : 'Cadastrar Cliente'}
                    </Button>
                </form>
            </Paper>

            <Paper sx={{ flex: 2, p: 3, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" mb={2} fontWeight="bold">
                    Lista de Clientes
                </Typography>

                <TextField
                    placeholder="Buscar por nome ou e-mail"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 2 }}
                />

                {loading ? (
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : clients.length === 0 ? (
                    <Typography variant="body1" textAlign="center" sx={{ mt: 5 }}>
                        Nenhum cliente encontrado.
                    </Typography>
                ) : (
                    <>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                                gap: 2,
                                flex: 1,
                            }}
                        >
                            {clients.map((client) => (
                                <Paper
                                    key={client.id}
                                    elevation={2}
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        borderRadius: 3,
                                        transition: '0.2s',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            boxShadow: 6,
                                            transform: 'translateY(-3px)',
                                        },
                                    }}
                                    onClick={() => navigate(`/contacts/${client.id}`)}
                                >
                                    <Avatar
                                        src={`https://i.pravatar.cc/150?u=${client.email}`}
                                        alt={client.nome}
                                        sx={{ width: 64, height: 64, mb: 1 }}
                                    />
                                    <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
                                        {client.nome}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" textAlign="center">
                                        {client.email}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        📞 {client.telefone}
                                    </Typography>
                                    <Typography variant="caption" color="text.disabled" mt={1}>
                                        {new Date(client.data_registro).toLocaleDateString('pt-BR')}
                                    </Typography>

                                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleEdit(client)
                                            }}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="error"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleOpenDeleteModal(client)
                                            }}
                                        >
                                            Excluir
                                        </Button>
                                    </Box>
                                </Paper>
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(e, value) => setPage(value)}
                                color="primary"
                            />
                        </Box>
                    </>
                )}
            </Paper>

            <Dialog
                open={openDeleteModal}
                onClose={handleCancelDelete}
            >
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja excluir o cliente "{clientToDelete?.nome}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancelar</Button>
                    <Button color="error" onClick={handleConfirmDelete}>Excluir</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
