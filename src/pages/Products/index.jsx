import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productValidation } from '../../utils/schemaValidation/productValidation'
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
import { productService } from '../../services/http/productService'
import { toast } from 'react-toastify'
import { money } from '../../utils/mask/money'

const defaultValues = {
  name: '',
  category: '',
  qty: '',
  description: '',
  value: ''
}

export function Products() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(productValidation),
    defaultValues
  })
  const [editing, setEditing] = useState(null)
  const [products, setProducts] = useState([])

  const handleCreateProduct = async data => {
    try {
      const product = await productService.createProduct(data)
      setProducts(state => [product, ...state])
      reset()
      toast.info('Produto criado')
    } catch(err) {
      toast.error('Ocorre um erro ao criar')
    }
  }

  const handleRemoveEdit = () => {
    reset(defaultValues)
    setEditing(null)
  }

  const handleEditProduct = async data => {
    try {
      const updatedProduct = await productService.updateProduct({
        ...data,
        id: editing
      })
      setProducts(state =>
        state.map(product => (product.id === updatedProduct.id ? updatedProduct : product))
      )
      handleRemoveEdit()
      toast.info('Produto editado')
    } catch {
      toast.error('Ocorre um erro ao editar')
    }
  }

  const handleFetchProducts = async () => {
    try {
      const products = await productService.listProducts()
      setProducts(products)
    } catch {
      toast.error('Ocorre um erro ao buscar')
    }
  }

  const handleDeleteProduct = async id => {
    try {
      await productService.deleteProduct(id)
      setProducts(state => state.filter(x => x.id !== id))
      toast.info('Produto deletado')
    } catch {
      toast.error('Ocorre um erro ao deletar')
    }
  }

  const menuItems = id => [
    {
      label: 'Editar',
      action: () => {
        setEditing(id)
        const product = products.find(x => x.id === id)
        console.log(product)
        reset(product)
      }
    },
    {
      label: 'Excluir',
      action: () => {
        handleDeleteProduct(id)
      }
    }
  ]

  const onSubmitForm = data => {
    if (editing) {
      handleEditProduct(data)
      return
    }

    handleCreateProduct(data)
  }

  useEffect(() => {
    handleFetchProducts()
  }, [])

  return (
    <section className={styles.Products}>
      <header className={styles.header}>
        {editing && <ArrowBackIosIcon onClick={handleRemoveEdit} />}
        <h1 className={styles.title}>Produtos</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              register={register}
              name="name"
              placeholder="Digite o nome"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              register={register}
              name="category"
              placeholder="Digite a categoria"
              error={!!errors.category}
              helperText={errors.category?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              register={register}
              name="qty"
              placeholder="Digite a quantidade"
              error={!!errors.qty}
              helperText={errors.qty?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              register={register}
              name="value"
              placeholder="Digite o valor"
              error={!!errors.value}
              helperText={errors.value?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <textarea
              className={styles.textarea}
              placeholder="Digite a descrição"
              {...register('description')}
            ></textarea>
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
                    <TableCell align="right">Categoria</TableCell>
                    <TableCell align="right">Valor</TableCell>
                    <TableCell align="right">Quantidade</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map(row => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.category}</TableCell>
                      <TableCell align="right">{money.apply(row.value)}</TableCell>
                      <TableCell align="right">{row.qty}</TableCell>
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
