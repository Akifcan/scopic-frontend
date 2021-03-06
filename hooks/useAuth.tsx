import { FC, useState, useEffect, useContext, createContext, ReactNode, useRef } from 'react';
import { useRouter } from 'next/router'
import { io, Socket } from "socket.io-client"

type Role = 'user' | 'admin'

interface User {
    name: string,
    avatarSrc: string,
    email: string,
    role: Role,
    password: string,
    autoBidAmount: number
}

const users: User[] = [
    {
        "name": "akifcan",
        avatarSrc: "https://randomuser.me/api/portraits/men/97.jpg",
        email: 'akfkara97@gmail.com',
        role: 'admin',
        password: '12345',
        autoBidAmount: 0,
    },
    {
        "name": "admin",
        avatarSrc: "https://randomuser.me/api/portraits/men/29.jpg",
        email: 'admin@gmail.com',
        role: 'admin',
        password: '12345',
        autoBidAmount: 0,
    },
    {
        "name": "john doe",
        avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
        email: 'john@gmail.com',
        role: 'user',
        password: '12345',
        autoBidAmount: 0,
    },
    {
        "name": "lena",
        avatarSrc: "https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e",
        email: 'lena@gmail.com',
        role: 'user',
        password: '12345',
        autoBidAmount: 0,
    },
    {
        "name": "alex",
        avatarSrc: "https://randomuser.me/api/portraits/men/12.jpg",
        email: 'alex@gmail.com',
        role: 'user',
        password: '12345',
        autoBidAmount: 0,
    },
]

interface SignInProps {
    email: string,
    password: string
}

interface ContextProps {
    user?: User,
    saveUser?: (user: SignInProps) => User | undefined,
    logout?: () => void,
    updateUser?: (user: User) => void,
    socket?: Socket
}

const authContext = createContext<ContextProps>({})

export const useAuth = () => {
    return useContext(authContext);
}

const useProvideAuth = () => {

    const router = useRouter()

    const [user, setUser] = useState<User>()
    const [socket, setSocket] = useState<Socket>()


    const saveUser = (user: SignInProps): User | undefined => {
        const currentUser = users.find(x => x.email === user.email && x.password === user.password)
        if (currentUser) {
            localStorage.setItem('user', JSON.stringify(currentUser))
            setUser(currentUser)
            router.push('/')
        }
        return currentUser
    }

    const updateUser = (user: User) => {
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(undefined)
        router.push('/sign-in')
    }

    const autoLogin = () => {
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user')!)
            setUser(user)
        }
    }

    useEffect(() => {
        autoLogin()
        setSocket(io(process.env.NEXT_PUBLIC_API_HOST!))
    }, [])

    return { user, saveUser, logout, updateUser, socket }
}

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}