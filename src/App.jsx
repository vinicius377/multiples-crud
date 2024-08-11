import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Layout } from './components/Layout'
import { Orders } from './pages/Orders'
import { Clients } from './pages/Clients'
import { Products } from './pages/Products'
import { Home } from './pages/Home'
import { NotFound } from './components/Layout/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
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
  },
  {
    path: '*',
    element: (
      <Layout>
        <NotFound />
      </Layout>
    )
  }
])

const App = () => {
  return <>
      <ToastContainer />
      <RouterProvider router={router} />
  </>
}

export default App
