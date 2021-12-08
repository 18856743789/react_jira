import React from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useState, } from "react"
import { useDebounce } from "utils"
import styled from "@emotion/styled"
import { Button, Typography } from "antd"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"
import { useUrlQueryParam } from "utils/url"
import { useProjectsSerachParams } from "./utils"
import { ButtonNoPadding, Row } from "components/lib"
import { useDispatch } from "react-redux"
import { projectListActions } from "./project-list.slice"
// 基本类型可以放在依赖里 组件状态 可以放在依赖里 非组件状态的对象 绝对不可以放到依赖里
// http://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js

export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
    const [param, setParam] = useProjectsSerachParams()
    const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200))
    const { data: users } = useUsers()
    const dispatch = useDispatch()

    return <Container>
        <Row between={true}>
            <h1>项目列表</h1>
            <ButtonNoPadding
            onClick={() => dispatch(projectListActions.openProjectModal()) }
            type={'link'}
        >
            创建项目
        </ButtonNoPadding>
        </Row>

        <SearchPanel users={users || []} param={param} setParam={setParam} />
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
        <List projectButton={props.projectButton} refresh={retry} loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
padding:3.2rem;
`