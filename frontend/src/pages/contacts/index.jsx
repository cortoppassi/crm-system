import { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    Paper,
    CircularProgress,
    Avatar,
    IconButton,
    Button,
    InputAdornment,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

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

    const MOCK_CLIENTS = [
        { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '11999990001', data_registro: '2025-10-01' },
        { id: 2, nome: 'Maria Oliveira', email: 'maria@email.com', telefone: '11999990002', data_registro: '2025-10-02' },
    ]

    const MOCK_CONTACTS = [
        { id: 1, clientId: 1, nome: 'Contato A', email: 'a@contato.com', telefone: '11911110001' },
        { id: 2, clientId: 1, nome: 'Contato B', email: 'b@contato.com', telefone: '11911110002' },
    ]

    useEffect(() => {
        const c = MOCK_CLIENTS.find(c => c.id === Number(clientId))
        setClient(c || null)
        fetchContacts()
    }, [clientId, page, search])

    const fetchContacts = () => {
        setLoading(true)
        setTimeout(() => {
            let filtered = MOCK_CONTACTS.filter(c => c.clientId === Number(clientId))
            if (search) {
                filtered = filtered.filter(c =>
                    c.nome.toLowerCase().includes(search.toLowerCase()) ||
                    c.email.toLowerCase().includes(search.toLowerCase())
                )
            }
            const perPage = 4
            const start = (page - 1) * perPage
            setContacts(filtered.slice(start, start + perPage))
            setTotalPages(Math.ceil(filtered.length / perPage))
            setLoading(false)
        }, 500)
    }

    const handleOpenAddContact = () => {
        setEditingContact(null)
        setOpenContactModal(true)
        reset()
    }

    const handleEditContact = (contact) => {
        setEditingContact(contact)
        setOpenContactModal(true)
        setValue('nome', contact.nome)
        setValue('email', contact.email)
        setValue('telefone', contact.telefone)
    }

    const handleDeleteContact = (contact) => {
        setContactToDelete(contact)
        setOpenDeleteModal(true)
    }

    const confirmDeleteContact = () => {
        setContacts(contacts.filter(c => c.id !== contactToDelete.id))
        setOpenDeleteModal(false)
        setContactToDelete(null)
    }

    const onSubmitContact = (data) => {
        if (editingContact) {
            setContacts(contacts.map(c => c.id === editingContact.id ? { ...c, ...data } : c))
        } else {
            const newContact = { id: Date.now(), clientId: Number(clientId), ...data }
            setContacts([...contacts, newContact])
        }
        setOpenContactModal(false)
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh', gap: 2, p: 3, backgroundColor: '#f9fafb' }}>
            <Paper sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {client && (
                    <>
                        <Avatar src={`https://i.pravatar.cc/150?u=${client.email}`} alt={client.nome} sx={{ width: 100, height: 100, mb: 2 }} />
                        <Typography variant="h6" fontWeight="bold">{client.nome}</Typography>
                        <Typography>{client.email}</Typography>
                        <Typography>📞 {client.telefone}</Typography>
                        <Typography variant="caption" color="text.disabled">{new Date(client.data_registro).toLocaleDateString('pt-BR')}</Typography>
                    </>
                )}
            </Paper>

            <Paper sx={{ flex: 2, p: 3, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">Contatos</Typography>
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenAddContact}>Adicionar Contato</Button>
                </Box>

                <TextField
                    placeholder="Buscar contatos"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment> }}
                    sx={{ mb: 2 }}
                />

                {loading ? (
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>
                ) : contacts.length === 0 ? (
                    <Typography textAlign="center" mt={5}>Nenhum contato encontrado.</Typography>
                ) : (
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 2 }}>
                        {contacts.map(c => (
                            <Paper key={c.id} sx={{ p: 2, borderRadius: 3, textAlign: 'center', '&:hover': { boxShadow: 6 } }}>
                                <Typography fontWeight="bold">{c.nome}</Typography>
                                <Typography color="text.secondary">{c.email}</Typography>
                                <Typography color="text.secondary">📞 {c.telefone}</Typography>
                                <Box sx={{ display: 'flex', gap: 1, mt: 1, justifyContent: 'center' }}>
                                    <Button size="small" variant="outlined" onClick={() => handleEditContact(c)}>Editar</Button>
                                    <Button size="small" variant="contained" color="error" onClick={() => handleDeleteContact(c)}>Excluir</Button>
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                )}
            </Paper>

            <Dialog open={openContactModal} onClose={() => setOpenContactModal(false)}>
                <DialogTitle>{editingContact ? 'Editar Contato' : 'Adicionar Contato'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nome completo"
                        fullWidth
                        margin="normal"
                        {...register('nome', { required: 'Nome é obrigatório' })}
                        error={!!errors.nome}
                        helperText={errors?.nome?.message}
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
                        {...register('telefone', { required: 'Telefone é obrigatório' })}
                        error={!!errors.telefone}
                        helperText={errors?.telefone?.message}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenContactModal(false)}>Cancelar</Button>
                    <Button onClick={handleSubmit(onSubmitContact)} variant="contained">{editingContact ? 'Salvar' : 'Adicionar'}</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <DialogContentText>
                            Tem certeza que deseja excluir o contato "{contactToDelete?.nome}"?
                        </DialogContentText>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteModal(false)}>Cancelar</Button>
                    <Button color="error" onClick={confirmDeleteContact}>Excluir</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
