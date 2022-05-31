/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'
import styles from '@/styles/product.module.css'
import { RiAuctionLine } from 'react-icons/ri'


const ProductCard: FC = () => {
    return <div aria-label='Product Card' className={`${styles.product} shadow  bg-body rounded`}>
        <div className={styles.image}>
            <img src='https://images.unsplash.com/photo-1518893883800-45cd0954574b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=434&q=80' alt='img' />
        </div>
        <div className={`p-2`}>
            <h5>Gramaphone</h5>
            <p className='text-muted'>Very good old gramphone</p>
            <p>Start Price: <b>50$</b> </p>
        </div>
        <button type="button" className="btn btn-primary w-100 rounded-0">Bid Now <RiAuctionLine fontSize={'1.5rem'} /></button>
    </div>
}

export default ProductCard