import React, { ReactNode, useCallback, useState } from "react"
import * as auth from 'auth-provider'
import { User } from "screens/project-list/search-panel"
import { http } from "utils/http"
import { useMount } from "utils"
import { useAsync } from "utils/use-async"
import { FullPageErrorFallback, FullPageLoading } from "components/lib"
import { useDispatch, useSelector } from "react-redux"
import * as authStore from 'store/auth.slice'
export interface AuthForm {
    username: string;
    password: string;
}

export const bootstarpUser = async () => {
    let user = null
    const token = auth.getToken()
    console.log(token)
    if (token) {
        const data = await http('me', { token })
        user = data.user
    }
    return user
}
/**
 * redux-thunk 替换原来写的context
 * @param param0 
 * @returns 
 */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { error, isLoading, isIdle, isError, run } = useAsync<User | null>()
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
    useMount(() => {
        run(dispatch(authStore.bootstrap()))
    })
    if (isIdle || isLoading) {
        return <FullPageLoading />
    }
    if (isError) {
        return <FullPageErrorFallback error={error}></FullPageErrorFallback>
    }
    return <>
        {children}
    </>

}
export const useAuth = () => {
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
    const user = useSelector(authStore.selectUser)
    const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
    const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
    const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])
    return {
        user,
        login,
        register,
        logout
    }
}