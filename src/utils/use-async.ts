import { useCallback, useState } from "react"
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
export const useAsync = <D>(initialState?: State<D>, intialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, intialConfig }
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })
    const mountedRef = useMountedRef()

    //useState 直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数 

    const [retry, setRetry] = useState(() => () => {

    })

    const setData = useCallback((data: D) => setState({
        data,
        start: 'success',
        error: null
    }), [])

    const setError = useCallback((error: Error) => setState({
        error,
        start: 'error',
        data: null
    }), [])

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
        setState(prevState => ({ ...prevState, start: 'loading' }))
        return promise
            .then(data => {
                if (mountedRef.current)
                    setData(data)
                return data
            })
            .catch(error => {
                setError(error)
                if (config.throwOnError) return Promise.reject(error)
                return error

            })
    }, [config.throwOnError, mountedRef, setData, setError]
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