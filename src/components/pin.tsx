import { Rate } from "antd";
import React from "react";

// 封装组件 使组件有透传的能力  React.ComponentProps<typeof Rate>
interface PinProps extends React.ComponentProps<typeof Rate> {
    checked: boolean,
    onCheckedChange?: (checked: boolean) => void
}

export const Pin = ({ checked, onCheckedChange, ...restProps }: PinProps) => {
    return (
        <Rate
            count={1}
            value={checked ? 1 : 0}
            onChange={num => onCheckedChange?.(!!num)}
            {...restProps}
        />
    )
}