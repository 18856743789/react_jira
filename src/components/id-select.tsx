import { Select } from "antd";
import React from "react";
import { Raw } from "types";

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    value: Raw | null | undefined,
    onChange: (value?: number) => void,
    defaultOptionName?: string,
    options?: { name: string, id: number }[]
}
/**
 * value可以传多种类型的值
 * onChange 只会回调 number|undefined类型
 * 当isNaN(Number(value)) 为true的时候 代表选择默认类型
 * 当选择默认类型的时候 onChange 会回调undefined
 * @param props 
 */
export const IdSelect = (props: IdSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...restProps } = props
    return (
        <Select
            value={toNumber(value)}
            onChange={value => onChange(toNumber(value) || undefined)}
            {...restProps}
        >
            {
                defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
            }
            {
                options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
            }

        </Select>
    )
}
const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)
