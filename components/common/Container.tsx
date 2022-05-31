import { FC, ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => {


    return <div className='body py-5'>
        <div className='container'>
            {children}
        </div>
    </div>
}

export default Container