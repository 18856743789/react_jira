import { useCallback, useReducer, useState } from "react"
import { start } from "repl"
import { useMountedRef } from "utils"

interface State<D> {
    error: Error | null;
    data: D | null;
    start: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    start: 'idle',
    data: null,
    error: null
}
const defaultConfig = {
    throwOnError: false
}
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef()
    return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [dispatch, mountedRef])
}
// TODO 用reducer改造
export const useAsync = <D>(initialState?: State<D>, intialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, intialConfig }
    const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
        ...defaultInitialState,
        ...initialState
    })
    const safeDispatch = useSafeDispatch(dispatch)

    //useState 直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数 

    const [retry, setRetry] = useState(() => () => {

    })

    const setData = useCallback((data: D) => safeDispatch({
        data,
        start: 'success',
        error: null
    }), [safeDispatch])

    const setError = useCallback((error: Error) => safeDispatch({
        error,
        start: 'error',
        data: null
    }), [safeDispatch])

    // run用来出发异步请求
    const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        if (!promise || !promise.then) {
            throw new Error("请传入promise类型数据")
        }
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        }
        )
        safeDispatch({ start: 'loading' })
        return promise
            .then(data => {
                setData(data)
                return data
            })
            .catch(error => {
                setError(error)
                if (config.throwOnError) return Promise.reject(error)
                return error

            })
    }, [config.throwOnError, setData, setError, safeDispatch]
    )
    return {
        isIdle: state.start === 'idle',
        isLoading: state.start === 'loading',
        isError: state.start === 'error',
        isSuccess: state.start === 'success',
        run,
        setData,
        setError,
        retry,
        ...state
    }
}