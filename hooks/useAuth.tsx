import { FC, useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { useRouter } from 'next/router'

const authContext = createContext<{ user: string | undefined }>({ user: undefined })

export const useAuth = () => {
    return useContext(authContext);
}

const useProvideAuth = () => {
    const [user, setUser] = useState<string>()
    return { user }
}

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}