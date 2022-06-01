import { FC, ReactNode } from 'react'
import Header from './Header'
import Link from 'next/link'

interface BreadcrumbProps {
    label: string,
    href?: string
}

interface ContainerProps {
    children: ReactNode,
    navigation?: BreadcrumbProps[]
}

const Container: FC<ContainerProps> = ({ children, navigation }) => {

    return <>
        <Header />
        {navigation && (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-white p-2 container">
                    {navigation.map((item, index) => {
                        return item.href ?
                            <Link key={index} passHref={true} href={item.href}><li className="breadcrumb-item"><a href="#">{item.label}</a></li></Link>
                            :
                            <li key={index} className="breadcrumb-item active" aria-current="page">{item.label}</li>
                    })}
                </ol>
            </nav>
        )}
        <div className='body py-2'>
            <div className='container'>
                {children}
            </div>
        </div>
    </>
}

export default Container