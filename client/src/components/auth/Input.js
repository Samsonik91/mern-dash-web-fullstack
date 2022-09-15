import {IconButton, InputAdornment, TextField} from "@mui/material"
import {Visibility, VisibilityOff} from "@mui/icons-material"

const Input = ({id, name, label, type, value, error, onChange, helperText, handleShowPassword}) => {
    return (
        <TextField
            id={id}
            name={name}
            variant='outlined'
            required
            fullWidth
            margin='normal'
            label={label}
            error={error}
            type={type}
            value={value}
            onChange={onChange}
            helperText={helperText}
            InputProps={ name === 'password' || name === 'confirmPassword' ? {
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                            { type=== 'password' ? <Visibility/> : <VisibilityOff/> }
                        </IconButton>
                    </InputAdornment>
                )
            }: null }
        />
    )
}

export default Input