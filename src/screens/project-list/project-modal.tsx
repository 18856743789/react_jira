import styled from "@emotion/styled";
import { Button, Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectListActions, selectProjectModalOpen } from "./project-list.slice";

export const ProjectModal = () => {
    const dispatch = useDispatch()
    const projectModalOpen = useSelector(selectProjectModalOpen)
    return (
        <Drawer onClose={() => dispatch(projectListActions.closeProjectModal())} visible={projectModalOpen} width={'100%'}>
            <h1>Project Modal</h1>
            <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>关闭</Button>
        </Drawer>
    )
}

