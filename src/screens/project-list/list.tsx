import React from "react"
import { Dropdown, Menu, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { User } from "screens/project-list/search-panel"
import { Link } from 'react-router-dom'
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { projectListActions } from "./project-list.slice";
import { useDispatch } from "react-redux";

//TODO 把所有id 类型string转换为number
export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}
interface ListProps extends TableProps<Project> {
    users: User[];
    refresh?: () => void,
    projectButton: JSX.Element;
}
export const List = ({ users, ...props }: ListProps) => {
    const { mutate } = useEditProject()
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props.refresh)
    const dispatch = useDispatch()
    return (
        <Table rowKey={"id"} pagination={false} columns={[
            {
                title: <Pin checked={true} disabled={true} />,
                render(value, project) {
                    return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
                }
            },
            {
                title: '名称', sorter: (a, b) => a.name.localeCompare(b.name),
                render(value, project) {
                    return <Link to={String(project.id)}>{project.name}</Link>
                }
            },
            { title: '部门', dataIndex: 'organization' },
            {
                title: '负责人', render(value, project) {
                    return <span>
                        {users.find(user => user.id === project.personId)?.name || '未知'}
                    </span>
                }
            },
            {
                title: '创建时间', render(value, project) {
                    return <span>
                        {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
                    </span>
                }
            }, {
                render(value, project) {
                    return <Dropdown overlay={<Menu>
                        <Menu.Item key={'edit'}>
                            <ButtonNoPadding type={'link'} onClick={() => dispatch(projectListActions.openProjectModal())}>编辑</ButtonNoPadding>
                        </Menu.Item>
                    </Menu>}>
                        <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
                    </Dropdown>
                }
            }
        ]} {...props} />
    )
}

