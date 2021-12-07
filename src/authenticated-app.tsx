import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { useAuth } from "context/auth-context";
import React, { useState } from "react";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as JiraLogo } from 'assets/Jira.svg'
import { Button, Dropdown, Menu } from "antd";
import { Route, Routes, Navigate } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";
/**
 * grid和flex 各自的应用场景
 * 1.要考虑是一维布局 还是二维布局 
 * 一般来说 一维布局用flex 二维布局 用grid
 * 2.是从内容出发还是从布局出发 
 * 从内容出发：你先有一组内容（—数量一般不固定），然后希望他们均匀的分布在 容器中，由内容自己的大小决定 占据的空间（flex）
 * 从布局出发，先规划网格（数量一般比较固定），然后再把元素往里面填充（grid）
 * @returns 
 */

export const AuthenticatedApp = () => {
    const [projectModalOpen, setProjectModalOpen] = useState(false)

    return (
        <Container>
            <PageHeader projectButton={<ButtonNoPadding type={'link'} onClick={() => setProjectModalOpen(true)}>
                创建项目
            </ButtonNoPadding>} />
            <Main>
                <Routes>
                    <Route path={'/projects'} element={<ProjectListScreen projectButton={<ButtonNoPadding type={'link'} onClick={() => setProjectModalOpen(true)}>
                        创建项目
                    </ButtonNoPadding>} />} />
                    <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
                    {/* <Navigate to='/projects' /> */}
                </Routes>
            </Main>
            <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)}></ProjectModal>
        </Container>
    )
}

const PageHeader = (props: { projectButton: JSX.Element }) => {
    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <ButtonNoPadding type={'link'} onClick={resetRoute} style={{ padding: 0 }}>
                    <JiraLogo width={'5rem'} color={"rgb(38,132,255)!important"} height={'32px'} />
                    <h2 style={{ float: "right", marginBottom: '2rem' }}>Jira Software</h2>
                </ButtonNoPadding>
                <ProjectPopover {...props} />
                <span>用户</span>
            </HeaderLeft>
            <HeaderRight>
                <User />
            </HeaderRight>
        </Header>
    )

}
const User = () => {
    const { logout, user } = useAuth()
    return (
        <Dropdown overlay={
            <Menu>
                <Menu.Item key={'logout'}>
                    <Button onClick={logout} type={"link"}>登出</Button>
                </Menu.Item>
            </Menu>
        }>
            <Button type={"link"} onClick={e => e.preventDefault()}>
                Hi,{user?.name}
            </Button>
        </Dropdown>
    )
}
const Container = styled.div`
display:grid;
grid-template-rows:6rem 1fr 6rem;
height:100vh;
`

const Header = styled(Row)`
padding:3.2rem;
box-shadow :0 0 5px rgba(0,0,0,.1);
z-index:1;
`
const HeaderLeft = styled(Row)`
`
const HeaderRight = styled.div``
const Main = styled.main``
