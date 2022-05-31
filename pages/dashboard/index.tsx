import { FC, useEffect } from 'react'

/* eslint-disable @next/next/no-img-element */
import Container from '@/components/common/Container'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'

const Dashboard = () => {

    const { user } = useAuth()
    const router = useRouter()

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
        {user && user.role === 'admin' && (
            <table className="bg-white table table-striped">
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
                    <tr>
                        <th scope="row">1</th>
                        <th><img width={'50'} height='50' className='img-fluid' src='https://images.unsplash.com/photo-1518893883800-45cd0954574b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=434&q=80' alt='image' /></th>
                        <td>Mark</td>
                        <td><h5><span className="badge bg-primary">Not start yet</span></h5></td>
                        <td><button className='btn btn-primary'>Go to Details</button></td>
                    </tr>
                </tbody>
            </table>
        )}
    </Container>
}

export default Dashboard