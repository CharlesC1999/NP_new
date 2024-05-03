import styles from './checkout.module.css'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '@/hooks/use-cart'

export default function Navbar() {
  const { totalItems } = useCart()
  return (
    <>
      <div className={styles['navbar']}>
        <div className={styles['logo']}>網站Logo</div>
        <div className={styles['header']}>
          <h2>購物車範例</h2>
        </div>
        <div className={styles['badge']}>
          <div className={styles['button']}>
            <FaShoppingCart />
            <span className={styles['button__badge']}>{totalItems}</span>
          </div>
        </div>
      </div>
    </>
  )
}
