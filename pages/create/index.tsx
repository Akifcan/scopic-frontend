import { FC, useEffect, useState, useCallback, FormEvent } from 'react'
import Container from '@/components/common/Container'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import Validation, { FormProps } from '@/helpers/validation'
import FormGroup from '@/components/common/FormGroup'
import '@/helpers/prototypes'
import { ProductProps } from '@/helpers/prototypes'

const Create: FC = () => {

    const { user } = useAuth()
    const router = useRouter()

    const [validation, setValidation] = useState<Validation>()

    const [name, setName] = useState<FormProps<string>>({ value: '', errorMessage: '' })
    const [description, setDescription] = useState<FormProps<string>>({ value: '', errorMessage: '' })
    const [price, setPrice] = useState<FormProps<number>>({ value: 100, errorMessage: '' })
    const [imageUrl, setImageUrl] = useState<FormProps<string>>({ value: '', errorMessage: '' })
    const [startDate, setStartDate] = useState<FormProps<string>>({ value: '', errorMessage: '' })
    const [endDate, setEndDate] = useState<FormProps<string>>({ value: '', errorMessage: '' })

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


    useEffect(() => {
        if (!user) {
            router.push('/sign-in')
        }
        if (user?.role !== 'admin') {
            router.push('/sign-in')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if (!user) return
        e.preventDefault()
        const response = await fetch('/product'.apiRequest(), {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'role': user?.role },
            body: JSON.stringify({
                "name": name.value,
                "description": description.value,
                "price": price.value,
                "imageUrl": imageUrl.value,
                "startDate": startDate.value,
                "endDate": endDate.value
            })
        })
        const data = await response.json()
        if (response.status === 201) {
            router.push(`/product/${data.id}`)
        }
    }

    return <Container navigation={[
        { label: 'Home', href: '/' },
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Create Product' }
    ]}>
        <form ref={form} onSubmit={onSubmit}>
            {validation && (
                <>
                    <FormGroup errorMessage={name.errorMessage} isRequired={true}>
                        <div className="input-group mb-2">
                            <span className="input-group-text" id="name">@</span>
                            <input
                                onChange={(e) => {
                                    setName({
                                        value: e.target.value,
                                        errorMessage: validation.setValue(e.target.value).notEmpty().validate()
                                    })
                                }}
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                aria-label="Name"
                                aria-describedby="Name" />
                        </div>
                    </FormGroup>
                    <FormGroup errorMessage={description.errorMessage} isRequired={true}>
                        <div className="input-group mb-2">
                            <span className="input-group-text" id="description">Description</span>
                            <textarea
                                onChange={(e) => {
                                    setDescription({
                                        value: e.target.value,
                                        errorMessage: validation.setValue(e.target.value).notEmpty().validate()
                                    })
                                }}
                                className="form-control"
                                placeholder="Description"
                                aria-label="Description"
                                aria-describedby="description" />
                        </div>
                    </FormGroup>
                    <FormGroup errorMessage={price.errorMessage} isRequired={true}>
                        <div className="input-group mb-2">
                            <span className="input-group-text" id="price">Price</span>
                            <input
                                onChange={(e) => {
                                    setPrice({
                                        value: +e.target.value,
                                        errorMessage: validation.setValue(e.target.value).notEmpty().validate()
                                    })
                                }}
                                type="number"
                                className="form-control"
                                placeholder="Price"
                                aria-label="Price"
                                aria-describedby="price" />
                        </div>
                    </FormGroup>
                    <FormGroup errorMessage={imageUrl.errorMessage} isRequired={true}>
                        <div className="input-group mb-2">
                            <span className="input-group-text" id="imageUrl">Image URL</span>
                            <input
                                onChange={(e) => {
                                    setImageUrl({
                                        value: e.target.value,
                                        errorMessage: validation.setValue(e.target.value).notEmpty().validate()
                                    })
                                }}
                                type="text"
                                className="form-control"
                                placeholder="Image url"
                                aria-label="Image url"
                                aria-describedby="Image url" />
                        </div>
                    </FormGroup>
                    <FormGroup errorMessage={startDate.errorMessage} isRequired={true}>
                        <div className="input-group mb-2">
                            <span className="input-group-text" id="startDate">Start Date</span>
                            <input
                                onChange={(e) => {
                                    setStartDate({
                                        value: e.target.value,
                                        errorMessage: validation.setValue(e.target.value).notEmpty().validate()
                                    })
                                }}
                                type="datetime-local"
                                className="form-control"
                                placeholder="Start Date"
                                aria-label="Start Date"
                                aria-describedby="Start Date" />
                        </div>
                    </FormGroup>
                    <FormGroup errorMessage={endDate.errorMessage} isRequired={true}>
                        <div className="input-group mb-2">
                            <span className="input-group-text" id="endDate">End Date</span>
                            <input
                                onChange={(e) => {
                                    setEndDate({
                                        value: e.target.value,
                                        errorMessage: validation.setValue(e.target.value).notEmpty().validate()
                                    })
                                }}
                                type="datetime-local"
                                className="form-control"
                                placeholder="end Date"
                                aria-label="end Date"
                                aria-describedby="end Date" />
                        </div>
                    </FormGroup>
                    <button disabled={disabled} type="submit" className='btn btn-primary w-100'>Create product</button>

                </>
            )}

        </form>
    </Container>
}

export default Create