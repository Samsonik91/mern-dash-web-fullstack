import {Box, styled, TextField} from "@mui/material"

export const MainBox = styled(Box)(()=>({
    background: 'white',
    padding: '16px',
    paddingLeft: '32px',
    paddingRight: '32px',
    borderRadius: '8px',
    marginBottom: '16px'
}))

export const NameField = styled(TextField)(({theme})=>({
    width: '75%',
    marginBottom: '16px',
    marginTop: '8px',
    [theme.breakpoints.down('sm')]:{
        width: '100%'
    },
    [theme.breakpoints.up('lg')]:{
        width: '50%'
    }
}))