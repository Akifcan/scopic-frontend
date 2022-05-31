import { FC } from 'react'
import Container from '@/components/common/Container'
import styles from '@/styles/signin.module.css'
import { RiLockPasswordLine } from 'react-icons/ri'

const SignIn: FC = () => {
    return <Container>
        <main className='d-flex justify-content-center align-items-center py-5 bg-white bg-body rounded shadow-lg flex-column'>
            <h1 className='mb-3'>Sign in to the Auction</h1>
            <form className={styles.form}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="email">@</span>
                    <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="email" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="email"><RiLockPasswordLine /></span>
                    <input type="text" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="password" />
                </div>
                <button className="btn btn-primary w-100" type="submit">Sign in</button>
            </form>
        </main>
    </Container>
}

export default SignIn