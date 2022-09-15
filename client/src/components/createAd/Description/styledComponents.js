import {Box, styled, TextField} from "@mui/material"

export const MainBox = styled(Box)(()=>({
    background: 'white',
    padding: '16px',
    paddingLeft: '32px',
    paddingRight: '32px',
    marginBottom: '16px',
    borderRadius: '8px'
}))

export const DescriptionField = styled(TextField)(()=>({
    maxWidth: '100%',
    fontSize: '1.1em',
    padding: '16px',
    marginLeft: '-16px'
}))