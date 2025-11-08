import { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    Paper,
    CircularProgress,
    Avatar,
    Button,
    InputAdornment,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Pagination,
    Snackbar,
    Alert
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export default function Contacts() {
    const { clientId } = useParams()
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

    const [client, setClient] = useState(null)
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [openContactModal, setOpenContactModal] = useState(false)
    const [editingContact, setEditingContact] = useState(null)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [contactToDelete, setContactToDelete] = useState(null)
    const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' })

    const fetchContacts = async () => {
        try {
            setLoading(true)
            const res = await axios.get('http://localhost:3000/contacts/paginated', {
                params: { clientId, page, search }
            })
            setContacts(res.data.contacts)
            setClient(res.data.client)
            setTotalPages(res.data.totalPages)
        } catch (err) {
            console.error(err)
            setContacts([])
        } finally {
            setLoading(false)
        }
    }

    const handleOpenAddContact = () => {
        setEditingContact(null)
        setOpenContactModal(true)
        reset()
    }

    const handleEditContact = (contact) => {
        setEditingContact(contact)
        setOpenContactModal(true)
        setValue('name', contact.name)
        setValue('email', contact.email)
        setValue('phone', contact.phone)
    }

    const handleDeleteContact = (contact) => {
        setContactToDelete(contact)
        setOpenDeleteModal(true)
    }

    const confirmDeleteContact = async () => {
        if (!contactToDelete) return
        try {
            setLoading(true)
            const res = await axios.delete(`http://localhost:3000/contacts/${contactToDelete.id}`)
            if (res.status === 200) {
                setContacts(contacts.filter(c => c.id !== contactToDelete.id))
            } else {
                setSnack({ open: true, message: 'Erro ao excluir contato. Tente novamente.', severity: 'error' })
            }
        } catch (err) {
            console.error('Erro ao excluir contato:', err)
            setSnack({ open: true, message: 'Erro ao excluir contato. Verifique o console.', severity: 'error' })
        } finally {
            setLoading(false)
            setOpenDeleteModal(false)
            setContactToDelete(null)
        }
    }

    const onSubmitContact = async (data) => {
        try {
            setLoading(true)
            if (editingContact) {
                const res = await axios.put(`http://localhost:3000/contacts/${editingContact.id}`, data)
                if (res.status === 200) {
                    setContacts(contacts.map(c => (c.id === editingContact.id ? res.data : c)))
                }
            } else {
                const res = await axios.post(`http://localhost:3000/contacts`, { clientId: Number(clientId), ...data })
                if (res.status === 201) {
                    setContacts([...contacts, res.data])
                }
            }
            setOpenContactModal(false)
            reset()
            setEditingContact(null)
        } catch (err) {
            console.error('Erro ao salvar contato:', err)
            setSnack({ open: true, message: 'Erro ao salvar contato.', severity: 'error' })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchContacts()
    }, [clientId, page, search])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'stretch',
                justifyContent: 'stretch',
                height: 'calc(100vh - 128px)',
                maxWidth: '1200px',
                width: '100%',
                gap: 3,
                p: 3,
                backgroundColor: '#f9fafb',
                overflow: 'hidden',
            }}
        >
            <Paper
                sx={{
                    flex: 1,
                    p: 3,
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {client && (
                    <>
                        <Avatar src={`https://i.pravatar.cc/150?u=${client.email}`} alt={client.name} sx={{ width: 100, height: 100, mb: 2 }} />
                        <Typography variant="h6" fontWeight="bold">{client.name}</Typography>
                        <Typography>{client.email}</Typography>
                        <Typography>📞 {client.phone}</Typography>
                        <Typography variant="caption" color="text.disabled">{new Date(client.createdAt).toLocaleDateString('pt-BR')}</Typography>
                    </>
                )}
            </Paper>

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
                    <Typography variant="h6" fontWeight="bold">Contatos</Typography>
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenAddContact}>Adicionar Contato</Button>
                </Box>

                <TextField
                    placeholder="Buscar contatos"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={e => {
                        setPage(1)
                        setSearch(e.target.value)
                    }}
                    InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment> }}
                    sx={{ mb: 2 }}
                />

                {loading ? (
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : contacts.length === 0 ? (
                    <Typography textAlign="center" mt={5}>Nenhum contato encontrado.</Typography>
                ) : (
                    <>
                        <Box
                            sx={{
                                flex: 1,
                                overflowY: 'auto',
                                maxHeight: 'calc(100vh - 300px)',
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
                                {contacts.map(c => (
                                    <Paper key={c.id} sx={{ p: 2, borderRadius: 3, textAlign: 'center', '&:hover': { boxShadow: 6 } }}>
                                        <Typography fontWeight="bold">{c.name}</Typography>
                                        <Typography color="text.secondary">{c.email}</Typography>
                                        <Typography color="text.secondary">📞 {c.phone}</Typography>
                                        <Box sx={{ display: 'flex', gap: 1, mt: 1, justifyContent: 'center' }}>
                                            <Button size="small" variant="outlined" onClick={() => handleEditContact(c)}>Editar</Button>
                                            <Button size="small" variant="contained" color="error" onClick={() => handleDeleteContact(c)}>Excluir</Button>
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                        </Box>

                        {/* PAGINAÇÃO */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
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

            {/* Modal de adicionar/editar */}
            <Dialog open={openContactModal} onClose={() => setOpenContactModal(false)}>
                <DialogTitle>{editingContact ? 'Editar Contato' : 'Adicionar Contato'}</DialogTitle>
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
                    <Button onClick={() => setOpenContactModal(false)}>Cancelar</Button>
                    <Button onClick={handleSubmit(onSubmitContact)} variant="contained">{editingContact ? 'Salvar' : 'Adicionar'}</Button>
                </DialogActions>
            </Dialog>

            {/* Modal de exclusão */}
            <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja excluir o contato "{contactToDelete?.name}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteModal(false)}>Cancelar</Button>
                    <Button color="error" onClick={confirmDeleteContact}>Excluir</Button>
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
        </Box>
    )
}
