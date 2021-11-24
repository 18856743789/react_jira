import React from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useState, useEffect } from "react"
import { cleanObject, useDebounce } from "utils"
import * as  qs from "qs"
import { useHttp } from "utils/http"
import styled from "@emotion/styled"


const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debounceParam = useDebounce(param, 200)
    const [users, setUsers] = useState([])
    const [list, setList] = useState([])
    const client = useHttp()
    useEffect(() => {
        client('projects', { data: cleanObject(debounceParam) }).then(setList)
    }, [debounceParam])
    useEffect(() => {
        client('users').then(setUsers)
    }, [])
    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </Container>
}

const Container = styled.div`
padding:3.2rem;
`