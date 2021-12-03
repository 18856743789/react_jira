import { useMemo } from "react"
import { useUrlQueryParam } from "utils/url"

export const useProjectsSerachParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return [
        useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
        setParam
    ] as const

}
