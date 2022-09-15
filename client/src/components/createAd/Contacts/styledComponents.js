import {Box, styled, TextField} from "@mui/material"

export const MainBox = styled(Box)(()=>({
    background: 'white',
    padding: '16px',
    paddingLeft: '32px',
    paddingRight: '32px',
    borderRadius: '8px'
}))

export const ContactField = styled(TextField)(({theme})=>({
    maxWidth: '300px',
    marginBottom: '24px',
    marginTop: '8px',
    [theme.breakpoints.down('sm')]:{
        width: '100%'
    }
}))