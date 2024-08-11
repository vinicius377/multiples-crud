import { useForm } from 'react-hook-form'
import { Grid } from '@mui/material'
import { TextField } from '../../components/Shared/TextField'
import { clientService } from '../../services/http/clientService'
import styles from './styles.module.css'
import { Button } from '../../components/Shared/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu } from '../../components/Shared/Menu'

export function Clients() {
  const { handleSubmit, register } = useForm()
  const [clients, setClients] = useState([])

  const onSubmit = data => {
    clientService.createClient(data)
  }

  const handleFetchClients = async () => {
    try {
      const clients = await clientService.listClients()
      setClients(clients)
    } catch (err) { }
  }

  const menuItems = [
    { label: 'Editar', action:() => {}},
    { label: 'Excluir', action: () => {}}
  ]

  useEffect(() => {
    handleFetchClients()
  }, [])

  return (
    <section className={styles.Clients}>
      <h1 className={styles.title}>Clientes</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              register={register}
              name="name"
              placeholder="Digite seu nome"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              register={register}
              name="email"
              placeholder="Digite seu e-mail"
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextField
              register={register}
              name="phoneNumber"
              placeholder="Digite seu número"
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextField
              register={register}
              name="cpf"
              placeholder="Digite seu cpf"
            />
          </Grid>
        </Grid>
        <Button>Criar</Button>
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right">Número</TableCell>
              <TableCell align="right">CPF</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map(row => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phoneNumber}</TableCell>
                <TableCell align="right">{row.cpf}</TableCell>
                <TableCell align="right">
                  <Menu items={menuItems}>
                    <MoreVertIcon/>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  )
}
