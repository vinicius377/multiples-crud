import styles from './styles.module.css'
import { Drawer } from './Drawer'

export function Layout({children}) {
  return <div className={styles.Layout}>
    <Drawer /> 
    <main>{children}</main>
  </div>
}
