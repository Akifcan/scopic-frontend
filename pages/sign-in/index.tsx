import { FC, useState, useCallback, useEffect, FormEvent } from 'react'
import Container from '@/components/common/Container'
import styles from '@/styles/signin.module.css'
import { RiLockPasswordLine } from 'react-icons/ri'
import Validation, { FormProps } from '@/helpers/validation'
import FormGroup from '@/components/common/FormGroup'
import { useAuth } from '@/hooks/useAuth'

const SignIn: FC = () => {

    const { saveUser } = useAuth()

    const [validation, setValidation] = useState<Validation>()

    const [email, setEmail] = useState<FormProps<string>>({ value: '', errorMessage: '' })
    const [password, setPassword] = useState<FormProps<string>>({ value: '', errorMessage: '' })
    const [showAlert, setShowAlert] = useState(false)

    const [disabled, setDisabled] = useState(true)

    const form = useCallback((node: HTMLFormElement) => {
        if (!node) return

        setValidation(new Validation(node))
        node.addEventListener('valid', () => {
            setDisabled(false)
        });
        node.addEventListener('not-valid', () => {
            setDisabled(true)
        })
    }, [])

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = saveUser!({ email: email.value, password: password.value })
        if (!result) {
            setShowAlert(true)
        } else {
            setShowAlert(false)
        }
    }

    return <Container>
        <main className='d-flex justify-content-center align-items-center py-5 bg-white bg-body rounded shadow-lg flex-column'>
            <h1 className='mb-3'>Sign in to the Auction</h1>
            <form ref={form} className={styles.form} onSubmit={onSubmit}>
                {showAlert && (
                    <div className="alert alert-danger" role="alert">
                        We couldnt find this user.
                    </div>
                )}
                {validation && (
                    <>
                        <FormGroup errorMessage={email.errorMessage} isRequired={true}>
                            <div className="input-group mb-2">
                                <span className="input-group-text" id="email">@</span>
                                <input
                                    onChange={(e) => {
                                        setEmail({
                                            value: e.target.value,
                                            errorMessage: validation.setValue(e.target.value).notEmpty().email().validate()
                                        })
                                    }}
                                    type="text"
                                    className="form-control"
                                    placeholder="Email"
                                    aria-label="Email"
                                    aria-describedby="email" />
                            </div>
                        </FormGroup>
                        <FormGroup errorMessage={password.errorMessage} isRequired={true}>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="email"><RiLockPasswordLine /></span>
                                <input
                                    onChange={(e) => {
                                        setPassword({
                                            value: e.target.value,
                                            errorMessage: validation.setValue(e.target.value).notEmpty().validate()
                                        })
                                    }}
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="password" />
                            </div>
                        </FormGroup>
                        <button disabled={disabled} className="btn btn-primary w-100" type="submit">Sign in</button>
                    </>
                )}
            </form>
        </main>
    </Container>
}

export default SignIn