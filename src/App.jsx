import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout'
import { Orders } from './pages/Orders'
import { Clients } from './pages/Clients'
import { Products } from './pages/Products'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        Todo
      </Layout>
    )
  },
  {
    path: '/pedidos',
    element: (
      <Layout>
        <Orders />
      </Layout>
    )
  },
  {
    path: '/clientes',
    element: (
      <Layout>
        <Clients />
      </Layout>
    )
  },
  {
    path: '/produtos',
    element: (
      <Layout>
        <Products />
      </Layout>
    )
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
