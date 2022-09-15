import {Avatar, Container, styled} from "@mui/material"

export const AuthContainer = styled(Container)(({theme})=>({
    margin: 'auto',
    marginTop: '40px',
    marginBottom: '40px',
    padding: '8px',
    paddingTop: '16px',
    border: '1px solid gray',
    borderRadius: '4px',
    background: 'white',
    [theme.breakpoints.down('sm')]:{
        width: '92%'
    }
}))

export const AuthAvatar = styled(Avatar)(()=>({
    marginLeft: '50%',
    marginBottom: '8px',
    transform: 'translateX(-50%)',
    background: '#9b14e3'
}))