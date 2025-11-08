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

    const fetchClients = async () => {
        setLoading(true);

        try {
            const res = await axios.get('http://localhost:3000/clients/paginated', {
                params: {
                    page,
                    search
                }
            });

            setClients(res.data.clients)
            setTotalPages(res.data.totalPages)
        } catch (err) {
            console.error(err);
            setClients([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDeleteModal = (client) => {
        setClientToDelete(client)
        setOpenDeleteModal(true)
    }

    const handleConfirmDelete = async () => {
        if (!clientToDelete) return;

        try {
            setLoading(true);
            await axios.delete(`http://localhost:3000/clients/${clientToDelete.id}`);

            setClients(clients.filter(c => c.id !== clientToDelete.id));
        } catch (err) {
            console.error(err);
        } finally {
            setOpenDeleteModal(false);
            setClientToDelete(null);
            setLoading(false);
        }
    };

    const handleCancelDelete = () => {
        setOpenDeleteModal(false)
        setClientToDelete(null)
    }

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            if (editingClient) {
                const res = await axios.put(`http://localhost:3000/clients/${editingClient.id}`, data);
                const updatedClient = res.data;

                setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c));
                setEditingClient(null);
            } else {
                // Criar novo cliente
                const res = await axios.post('http://localhost:3000/clients', data);
                const newClient = res.data;
                setClients([...clients, newClient]);
            }

            reset();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (client) => {
        setEditingClient(client)
        setValue('name', client.name)
        setValue('email', client.email)
        setValue('phone', client.phone)
    }

    useEffect(() => {
        fetchClients()
    }, [page, search])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                height: 'calc(100vh - 128px)',
                maxWidth: '1200px',
                width: '100%',
                gap: 3,
                p: 3,
                backgroundColor: '#f9fafb',
                overflow: 'hidden',
            }}
        >
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
                        {...register('name', { required: 'Nome é obrigatório' })}
                        error={!!errors.name}
                        helperText={errors?.name?.message}
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
                        {...register('phone', { required: 'Telefone é obrigatório' })}
                        error={!!errors.phone}
                        helperText={errors?.phone?.message}
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
                                flex: 1,
                                overflowY: 'auto',
                                maxHeight: 'calc(100vh - 250px)',
                                p: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                                    gap: 2,
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
                                            maxHeight: 260,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            '&:hover': {
                                                boxShadow: 6,
                                                transform: 'translateY(-3px)',
                                            },
                                        }}
                                        onClick={() => navigate(`/contacts/${client.id}`)}
                                    >
                                        <Avatar
                                            src={`https://i.pravatar.cc/150?u=${client.email}`}
                                            alt={client.name}
                                            sx={{ width: 64, height: 64, mb: 1 }}
                                        />
                                        <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
                                            {client.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" textAlign="center">
                                            {client.email}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            📞 {client.phone}
                                        </Typography>
                                        <Typography variant="caption" color="text.disabled" mt={1}>
                                            {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                                        </Typography>

                                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(client);
                                                }}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="error"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpenDeleteModal(client);
                                                }}
                                            >
                                                Excluir
                                            </Button>
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
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
                        Tem certeza que deseja excluir o cliente "{clientToDelete?.name}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancelar</Button>
                    <Button color="error" onClick={handleConfirmDelete}>Excluir</Button>
                </DialogActions>
            </Dialog>
        </Box >
    )
}
