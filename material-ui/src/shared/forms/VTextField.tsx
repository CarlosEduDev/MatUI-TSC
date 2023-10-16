import { TextFields } from "@mui/icons-material"

import { useField } from '@unform/core'

type TVTextFieldsProps = {
    name: string;
} 

export const VTextField: React.FC<TVTextFieldsProps> = ({name}) => {

    const {} = useField(name);

    return(
        <TextFields

        />
    )
}