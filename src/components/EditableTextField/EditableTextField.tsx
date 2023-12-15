import { useEffect, useState } from 'react';
import s from './EditableTextField.module.css'
import { Input, Tooltip } from '@mui/material';

interface TextFieldProps {
    title: string;
    value: string | number;
}

export default function EditableTextField({ title, value }: TextFieldProps) {
    const [isEdit, setIsEdit] = useState(false)
    const [text, setText] = useState(value)

    useEffect(() => {
        setText(value)
    }, [value])

    const onDubleClickHandler = (e: React.MouseEvent<HTMLInputElement>) => {
        if (e.detail === 2) {
            return setIsEdit(!isEdit);
        }
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)

    return (
        <div className={s.root}>
            <span className={s.title}> {title} :</span>
            <Tooltip title={isEdit ? "Doble-Click to Save" : "Click to Edit"} placement="bottom-start">
                {
                    isEdit ?
                        <Input
                            type="text"
                            value={text}
                            onChange={onChangeHandler}
                            onClick={onDubleClickHandler}
                        />
                        :
                        <div
                            className={s.value}
                            onClick={() => setIsEdit(!isEdit)}
                        > {text} </div>
                }
            </Tooltip>

        </div>
    )
}