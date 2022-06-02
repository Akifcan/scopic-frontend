import { FC, useEffect, useState } from 'react'

/* eslint-disable @next/next/no-img-element */
import Container from '@/components/common/Container'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { ProductProps } from '@/helpers/prototypes'
import Link from 'next/link'
import '@/helpers/prototypes'

const Dashboard: FC = () => {

    const [products, setProducts] = useState<ProductProps[]>([])

    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) return
        fetch("/product/admin".apiRequest(), { headers: { "role": user.role } })
            .then(res => res.json())
            .then((data: ProductProps[]) => {
                setProducts(data)
            })
    }, [user])

    useEffect(() => {
        if (!user) {
            router.push('/sign-in')
        }
        if (user?.role !== 'admin') {
            router.push('/sign-in')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return <Container navigation={[{ label: 'Home', href: '/' }, { label: 'Management' }]}>
        {user && user.role === 'admin' && products && (
            <>
                <button className='btn btn-primary mb-2' onClick={() => router.push('/create')}>Create New Auction</button>
                <table className="bg-white table table-striped overflow-scroll">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Auction Status</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => {
                            return <tr key={product.id}>
                                <th scope="row">{index}</th>
                                <th><img width={'50'} height='50' className='img-fluid' src={product.imageUrl} alt={product.name} /></th>
                                <td>{product.name}</td>
                                <td><h5><span className="badge bg-primary text-uppercase">{product.status}</span></h5></td>
                                <td><Link passHref={true} href={`/product/${product.id}`}><button className='btn btn-primary'>Go to Details</button></Link></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </>
        )}
    </Container>
}

export default Dashboard