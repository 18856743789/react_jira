import { useEffect } from "react"
import { Project } from "screens/project-list/list"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useProjects = (param?:Partial<Project>) => {
    const client = useHttp()

    const {run,...result} = useAsync<Project[]>()
    useEffect(() => {
        run(client('projects', { data: cleanObject(param || {}) }))

    }, [param])
    return result
}
