import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import React from "react"
import { User } from "screens/project-list/search-panel"
import { Link } from 'react-router-dom'

//TODO 把所有string转换为number
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
}
export const List = ({ users, ...props }: ListProps) => {
    return (
        <Table rowKey={"id"} pagination={false} columns={[
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
            }
        ]} {...props} />
    )
}