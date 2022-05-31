import { FC, ReactNode } from 'react'
import Header from './Header'
import { AuthProvider } from '@/hooks/useAuth'

interface ContainerProps {
    children: ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => {

    return <AuthProvider>
        <Header />
        <div className='body py-2'>
            <div className='container'>
                {children}
            </div>
        </div>
    </AuthProvider>
}

export default Container