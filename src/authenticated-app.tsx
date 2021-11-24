import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";
import {ReactComponent as JiraLogo} from 'assets/Jira.svg'
import { Dropdown, Menu} from "antd";
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
    const { logout ,user} = useAuth()
    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <JiraLogo width={'10rem'} color={"rgb(38,132,255)"}/>
                    <h2>项目</h2>
                    <h2>用户</h2>
                </HeaderLeft>
                <HeaderRight>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item key={'logout'}>
                            <a onClick={logout}>登出</a>
                            </Menu.Item>
                        </Menu>
                    }>
                        <a onClick={e => e.preventDefault()}>
                            Hi,{user?.name}
                        </a>
                    </Dropdown>
                </HeaderRight>
            </Header>
            <Main>
                <ProjectListScreen />
            </Main>
        </Container>
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



