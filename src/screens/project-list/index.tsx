import React from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useState, } from "react"
import { useDebounce } from "utils"
import styled from "@emotion/styled"
import { Typography } from "antd"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"
import { useUrlQueryParam } from "utils/url"


export const ProjectListScreen = () => {
    // const [, setParam] = useState({
    //     name: '',
    //     personId: ''
    // })
    // 基本类型可以放在依赖里 组件状态 可以放在依赖里 非组件状态的对象 绝对不可以放到依赖里
    // http://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js
    // const [keys] = useState<('name' | 'personId')[]>(['name','personId'])
    const [param,setParam] = useUrlQueryParam(['name','personId'])
    const debounceParam = useDebounce(param, 200)
    const { isLoading, error, data: list } = useProjects(debounceParam)
    const { data: users } = useUsers()
    console.log(useUrlQueryParam(['name']))

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
        <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
padding:3.2rem;
`