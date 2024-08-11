import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientValidation } from '../../utils/schemaValidation/clientValidation'
import { Grid } from '@mui/material'
import { TextField } from '../../components/Shared/TextField'
import { Button } from '../../components/Shared/Button'
import { Menu } from '../../components/Shared/Menu'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import styles from './styles.module.css'
import { clientService } from '../../services/http/clientService'
import { toast } from 'react-toastify'

const defaultValues = {
  name: '',
  email: '',
  cpf: '',
  phoneNumber: '',
  yearsOld: ''
}

export function Clients() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(clientValidation),
    defaultValues
  })
  const [editing, setEditing] = useState(null)
  const [clients, setClients] = useState([])

  const handleCreateClient = async data => {
    try {
      const client = await clientService.createClient(data)
      setClients(state => [client, ...state])
      reset()
      toast.info('Cliente criado')
    } catch {
      toast.error('Ocorre um erro')
    }
  }

  const handleRemoveEdit = () => {
    reset(defaultValues)
    setEditing(null)
  }

  const handleEditClient = async data => {
    try {
      const updatedClient = await clientService.updateClient(data)
      setClients(state =>
        state.map(client => (client.id === data.id ? updatedClient : client))
      )
      handleRemoveEdit()
      toast.info('Cliente editado')
    } catch {
      toast.error('Ocorre um erro')
    }
  }

  const handleFetchClients = async () => {
    try {
      const clients = await clientService.listClients()
      setClients(clients)
    } catch {
      toast.error('Ocorre um erro ao buscar')
    }
  }

  const handleDeleteClient = async id => {
    try {
      await clientService.deleteClient(id)
      setClients(state => state.filter(x => x.id !== id))
      toast.info('Cliente deletado')
    } catch { 
      toast.error('Ocorre um erro ao deletar')
    }
  }

  const menuItems = id => [
    {
      label: 'Editar',
      action: () => {
        setEditing(id)
        const client = clients.find(x => x.id === id)
        reset(client)
      }
    },
    {
      label: 'Excluir',
      action: () => {
        handleDeleteClient(id)
      }
    }
  ]

  const onSubmitForm = data => {
    if (editing) {
      handleEditClient(data)
      return
    }

    handleCreateClient(data)
  }

  useEffect(() => {
    handleFetchClients()
  }, [])

  return (
    <section className={styles.Clients}>
      <header className={styles.header}>
        {editing && <ArrowBackIosIcon onClick={handleRemoveEdit} />}
        <h1 className={styles.title}>Clientes</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              register={register}
              name="name"
              placeholder="Digite o nome"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              register={register}
              name="email"
              placeholder="Digite o e-mail"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              register={register}
              name="yearsOld"
              placeholder="Digite a idade"
              error={!!errors.yearsOld}
              helperText={errors.yearsOld?.message}
            />
          </Grid>
          <Grid item xs={8} sm={6}>
            <TextField
              register={register}
              name="phoneNumber"
              placeholder="Digite o número de telefone"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              register={register}
              name="cpf"
              placeholder="Digite o CPF"
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
            />
          </Grid>
        </Grid>
        <div className={styles.btnBox}>
          <Button type="submit">{editing ? 'Salvar' : 'Criar'}</Button>
        </div>
      </form>
      <div className={styles.tableWrapper}>
        <div className={styles.tableBox}>
          {!editing && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="right">E-mail</TableCell>
                    <TableCell align="right">Número</TableCell>
                    <TableCell align="right">CPF</TableCell>
                    <TableCell align="right">Idade</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clients.map(row => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.phoneNumber}</TableCell>
                      <TableCell align="right">{row.cpf}</TableCell>
                      <TableCell align="right">{row.yearsOld}</TableCell>
                      <TableCell align="right">
                        <Menu items={menuItems(row.id)}>
                          <MoreVertIcon />
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </section>
  )
}
