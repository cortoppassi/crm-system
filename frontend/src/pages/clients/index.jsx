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
    Snackbar,
    Alert,
    Tooltip,
} from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../UserContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Clients() {
    const { user } = useUser();
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
    const [openClientModal, setOpenClientModal] = useState(false)
    const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' })
    const [chartData, setChartData] = useState([]);
    const colors = ['#6a1b9a', '#ff6f61', '#00b894', '#fdcb6e', '#0984e3', '#e17055'];

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

    const getClientsPerMonth = (clients) => {
        const counts = {};

        clients.forEach(client => {
            const date = new Date(client.createdAt);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const key = `${year}-${month.toString().padStart(2, '0')}`;

            counts[key] = (counts[key] || 0) + 1;
        });

        const chartData = Object.entries(counts)
            .map(([month, count]) => ({ month, count }))
            .sort((a, b) => a.month.localeCompare(b.month));

        return chartData;
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
            setSearch('');
        }
    };

    const handleCancelDelete = () => {
        setOpenDeleteModal(false)
        setClientToDelete(null)
    }

    const handleSubmitClient = async (data) => {
        try {
            setLoading(true)
            if (editingClient) {
                const res = await axios.put(`http://localhost:3000/clients/${editingClient.id}`, data)
                setClients(clients.map(c => c.id === res.data.id ? res.data : c))
                setSnack({ open: true, message: 'Cliente atualizado com sucesso!', severity: 'success' })
            } else {
                const res = await axios.post('http://localhost:3000/clients', data)
                setClients([...clients, res.data])
                setSnack({ open: true, message: 'Cliente cadastrado com sucesso!', severity: 'success' })
            }
            setOpenClientModal(false)
            reset()
            setEditingClient(null)
        } catch (err) {
            console.error(err)
            setSnack({ open: true, message: 'Erro ao salvar cliente.', severity: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const handleOpenAddClient = () => {
        setEditingClient(null)
        setOpenClientModal(true)
        reset()
    }

    const handleOpenEditClient = (client) => {
        setEditingClient(client)
        setOpenClientModal(true)
        setValue('name', client.name)
        setValue('email', client.email)
        setValue('phone', client.phone)
    }

    useEffect(() => {
        fetchClients()
    }, [page, search])

    useEffect(() => {
        const data = getClientsPerMonth(clients);
        setChartData(data);
    }, [clients]);

    useEffect(() => {
        if (editingClient) {
            setValue('name', editingClient.name)
            setValue('email', editingClient.email)
            setValue('phone', editingClient.phone)
        } else {
            reset()
        }
    }, [editingClient, setValue, reset])

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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    gap: 2,
                    minWidth: 0,
                }}
            >
                <Paper
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: { xs: '100%', md: 'calc(50% - 8px)' },
                        p: 3,
                    }}
                >
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


                    <Typography variant="h6" fontWeight="bold">
                        {user?.user?.email}
                    </Typography>
                </Paper>
                <Paper
                    sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: { xs: '100%', md: 'calc(50% - 8px)' },
                        p: 3,
                    }}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <RechartsTooltip />
                            <Bar dataKey="count">
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            </Box>

            <Paper sx={{ flex: 2, p: 3, display: 'flex', flexDirection: 'column' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'stretch', sm: 'center' },
                        mb: 2,
                        gap: 1,
                    }}
                >
                    <Typography variant="h6" fontWeight="bold">
                        Lista de Clientes
                    </Typography>
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenAddClient}>
                        Adicionar Cliente
                    </Button>
                </Box>

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
                                    <Tooltip
                                        key={client.id}
                                        title="Clique para visualizar os contatos deste cliente"
                                        arrow
                                        placement="top"
                                    >
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
                                                        handleOpenEditClient(client);
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
                                    </Tooltip>
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

            <Dialog open={openClientModal} onClose={() => setOpenClientModal(false)}>
                <DialogTitle>{editingClient ? 'Editar Cliente' : 'Adicionar Cliente'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nome completo"
                        fullWidth
                        margin="normal"
                        {...register('name', { required: 'Nome é obrigatório' })}
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                    />
                    <TextField
                        label="E-mail"
                        fullWidth
                        margin="normal"
                        {...register('email', { required: 'E-mail é obrigatório' })}
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                    />
                    <TextField
                        label="Telefone"
                        fullWidth
                        margin="normal"
                        {...register('phone', { required: 'Telefone é obrigatório' })}
                        error={!!errors.phone}
                        helperText={errors?.phone?.message}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenClientModal(false)}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSubmit(handleSubmitClient)}>
                        {editingClient ? 'Salvar' : 'Adicionar'}
                    </Button>
                </DialogActions>
            </Dialog>

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

        </Box >
    )
}
