import {Box, styled, Avatar, Typography} from "@mui/material"

export const MainContainer = styled(Box)(({theme})=>({
    maxWidth: '992px',
    width: '96%',
    margin: 'auto',
    background: 'white',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '16px',
    marginBottom: '16px',
    [theme.breakpoints.down('sm')]:{
        width: '92%'
    },
    [theme.breakpoints.up('md')]:{
        width: '100%',
        marginTop: '32px',
        marginBottom: '32px'
    }
}))

export const TopAuthorBox = styled(Box)(({theme})=>({
    width: '100%',
    display: 'flex',
    justifyContent: 'start',
    marginTop: '16px',
    [theme.breakpoints.down('sm')]:{
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
    },
    [theme.breakpoints.up('sm')]:{
        marginLeft: '32px'
    }
}))

export const AuthorAvatar = styled(Avatar)(()=>({
    width: '116px',
    height: '116px'
}))

export const NameBox = styled(Box)(({theme})=>({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'start',
    [theme.breakpoints.down('sm')]:{
        alignItems: 'center'
    },
    [theme.breakpoints.up('sm')]:{
        marginLeft: '24px',
    }
}))

export const LocationTypography = styled(Typography)(({theme})=>({
    [theme.breakpoints.down('sm')]:{
        marginTop: '16px'
    }
}))