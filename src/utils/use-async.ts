import { useState } from "react"
import { start } from "repl"

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

    const setData = (data: D) => setState({
        data,
        start: 'success',
        error: null
    })

    const setError = (error: Error) => setState({
        error,
        start: 'error',
        data: null
    })

    // run用来出发异步请求
    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error("请传入promise类型数据")
        }
        setState({ ...state, start: 'loading' })
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
    }
    return {
        isIdle: state.start === 'idle',
        isLoading: state.start === 'loading',
        isError: state.start === 'error',
        isSuccess: state.start === 'success',
        run,
        setData,
        setError,
        ...state
    }
}