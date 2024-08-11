import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { orderValidation } from '../../utils/schemaValidation/orderValidation'
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
import { orderService } from '../../services/http/orderService'
import { productService } from '../../services/http/productService'
import { clientService } from '../../services/http/clientService'
import { toast } from 'react-toastify'
import { Select } from '../../components/Shared/Select'
import { PaymentMethods } from '../../constants/PaymentMethods'

const defaultValues = {
  clientId: '',
  paymentMethod: '',
  products: []
}

export function Orders() {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(orderValidation),
    defaultValues
  })
  const [editing, setEditing] = useState(null)
  const [orders, setOrders] = useState([])
  const [clients, setClients] = useState([])
  const [products, setProducts] = useState([])
  const selectedProducts = watch('products')

  const mapProducts = item => ({
    name: item.name,
    qty: item.qty,
    id: item.id,
    value: item.value
  })

  const getTotal = (acc, item) => {
    acc += item.qty * item.value
    return acc
  }

  const handleCreateOrder = async data => {
    try {
      const products = data.products.map(mapProducts)
      const total = data.products.reduce(getTotal, 0)
      const payload = {
        ...data,
        products,
        total
      }
      const order = await orderService.createOrder(payload)
      setOrders(state => [order, ...state])
      reset()
      toast.info('Pedido criado')
    } catch {
      toast.error('Ocorre um erro ao criar')
    }
  }

  const handleRemoveEdit = () => {
    reset(defaultValues)
    setEditing(null)
  }

  const handleEditClient = async data => {
    try {
      const products = data.products.map(mapProducts)
      const total = data.products.reduce(getTotal, 0)
      const payload = {
        ...data,
        products,
        total
      }
      const updatedOrder = await orderService.updateOrder(payload)
      setOrders(state =>
        state.map(order => (order.id === data.id ? updatedOrder : order))
      )
      handleRemoveEdit()
      toast.info('Pedido editado')
    } catch {
      toast.error('Ocorre um erro editar')
    }
  }

  const handleFetchInitialData = async () => {
    try {
      const [orders, clients, products] = await Promise.all([
        orderService.listOrders(),
        clientService.listClients(),
        productService.listProducts()
      ])
      setOrders(orders)
      setProducts(products)
      setClients(clients)
    } catch {
      toast.error('Ocorre um erro ao buscar')
    }
  }

  const handleDeleteOrder = async id => {
    try {
      await orderService.deleteOrder(id)
      setOrders(state => state.filter(x => x.id !== id))
      toast.info('Pedido deletado')
    } catch {
      toast.error('Ocorre um erro ao deletar')
    }
  }

  const menuItems = id => [
    {
      label: 'Editar',
      action: () => {
        setEditing(id)
        const order = orders.find(x => x.id === id)
        reset(order)
      }
    },
    {
      label: 'Excluir',
      action: () => {
        handleDeleteOrder(id)
      }
    }
  ]

  const onSubmitForm = data => {
    if (editing) {
      handleEditClient(data)
      return
    }

    handleCreateOrder(data)
  }

  const onAddProduct = ({ target }) => {
    const id = target.value

    if (selectedProducts.some(x => x.id === id)) return

    const product = products.find(x => x.id === id)
    const data = {
      name: product.name,
      qty: 0,
      available: product.qty,
      value: product.value,
      descripton: product.description,
      id
    }

    setValue('products', [...selectedProducts, data])
  }

  const handleChangeProductQty = (qty, product) => {
    const qtyNumber = Number(qty.replace(/\D/g, '') || '')
    const value = qtyNumber > product.available ? product.available : qtyNumber
    const newProductData = {
      ...product,
      qty: value
    }

    setValue(
      'products',
      selectedProducts.map(item =>
        item.id === product.id ? newProductData : item
      )
    )
  }

  const getClientName = (id) => clients.find(x => x.id === id)?.name || 'Cliente' 
  const getPaymentMethd = (value) => PaymentMethods.find(x => x.value === value)?.label || 'Forma de pagamento'

  useEffect(() => {
    handleFetchInitialData()
  }, [])

  return (
    <section className={styles.Orders}>
      <header className={styles.header}>
        {editing && <ArrowBackIosIcon onClick={handleRemoveEdit} />}
        <h1 className={styles.title}>Pedidos</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Select
              label="Cliente"
              items={clients.map(x => ({ label: x.name, value: x.id }))}
              defaulValue=""
              name="clientId"
              register={register}
              error={errors.clientId?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              label="Método de pagamento"
              items={PaymentMethods}
              defaulValue=""
              name="paymentMethod"
              error={errors.paymentMethod?.message}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              label="Produtos"
              defaulValue=""
              items={products.map(x => ({ label: x.name, value: x.id }))}
              onChange={onAddProduct}
              value=""
              error={errors.products?.message}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
              {selectedProducts.map(item => (
                <div className={styles.productQty}>
                  <div className={styles.productInfo}>
                    <span>{item.name}</span>
                    <p>{item.descripton}</p>
                  </div>
                  <TextField
                    value={item.qty}
                    onChange={({ target }) =>
                      handleChangeProductQty(target.value, item)
                    }
                    style={{ width: '5rem' }}
                  />
                </div>
              ))}
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
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Nome do cliente</TableCell>
                    <TableCell align="right">Forma de pagamento</TableCell>
                    <TableCell align="right">Qtd. produtos</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map(row => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell component="th" align="right" scope="row">
                        {getClientName(row.clientId)}
                      </TableCell>
                      <TableCell align="right">{getPaymentMethd(row.paymentMethod)}</TableCell>
                      <TableCell align="right">{row.products.length}</TableCell>
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
