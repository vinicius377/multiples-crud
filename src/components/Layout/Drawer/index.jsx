import { Link, matchPath, useLocation } from 'react-router-dom'
import styles from './styles.module.css'
import classNames from 'classnames'

const Routes = [
  {
    label: 'Cliente',
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

  return (
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
}
