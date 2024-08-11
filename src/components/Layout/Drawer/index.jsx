import { Link, matchPath, useLocation } from 'react-router-dom'
import styles from './styles.module.css'
import classNames from 'classnames'
import useWindowDimensions from '../../../hooks/useWindowDimension'
import { useState } from 'react'
import { Drawer as DrawerBase, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Routes = [
  {
    label: 'Clientes',
    path: '/clientes'
  },
  {
    label: 'Produtos',
    path: '/produtos'
  },
  {
    label: 'Pedidos',
    path: '/pedidos'
  }
]

export function Drawer() {
  const { pathname } = useLocation()
  const { width: windowSize } = useWindowDimensions()

  const Content = () => (
    <aside className={styles.aside}>
      <nav>
        <ul>
          {Routes.map(route => (
            <li
              className={classNames({
                [styles.menuOption]: true,
                [styles.menuOptionActive]: !!matchPath(route.path, pathname)
              })}
              key={route.path}
            >
              <Link to={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )

  return windowSize > 600 ? (
    <Content />
  ) : (
    <DrawerBox>
      <Content />
    </DrawerBox>
  )
}

function DrawerBox({ children }) {
  const [open, setOpen] = useState(false)

  const toggleDrawer = newOpen => () => {
    setOpen(newOpen)
  }

  return (
    <>
      <div className={styles.hambIcon}  onClick={toggleDrawer(true)}>
        <MenuIcon />
      </div>
      <DrawerBase open={open} onClose={toggleDrawer(false)}>
        {children}
      </DrawerBase>
    </>
  )
}
