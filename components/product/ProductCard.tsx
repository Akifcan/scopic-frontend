/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'
import styles from '@/styles/product.module.css'
import { RiAuctionLine } from 'react-icons/ri'
import { ProductProps } from '@/helpers/prototypes'
import Link from 'next/link'

interface ProductCardProps {
    height?: number,
    product: ProductProps
}

const ProductCard: FC<ProductCardProps> = ({ height = 200, product }) => {
    return <Link passHref={true} href={`/product/${product.id}`}>
        <div aria-label='Product Card' className={`${styles.product} shadow  bg-body rounded`} style={{ cursor: 'pointer' }}>
            <div className={styles.image} style={{ height }}>
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className={`p-2`}>
                <h5>{product.name}</h5>
                <p className='text-muted'>{product.description}</p>
                <p>Start Price: <b>{product.price}$</b> </p>
            </div>
            <button type="button" className="btn btn-primary w-100 rounded-0">Bid Now <RiAuctionLine fontSize={'1.5rem'} /></button>
        </div>
    </Link>
}

export default ProductCard