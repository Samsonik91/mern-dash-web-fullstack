import {Box, Container, styled, TextField, Typography} from "@mui/material"

export const ViewBoxLarge = styled(Box)(({theme})=>({
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'block'
    }
}))

export const ViewBoxSmall = styled(Box)(({theme})=>({
    display: 'none',
    [theme.breakpoints.down('md')]:{
        display: 'block'
    }
}))

export const Messanger = styled(Container)(({theme})=>({
    minHeight: '500px',
    display: 'flex',
    width: '99%',
    marginTop: '24px',
    marginBottom: '24px',
    [theme.breakpoints.down('sm')]:{
        flexDirection: 'column',
        gap: '16px',
        background: 'white',
        width: '94%',
        marginTop: '16px',
        marginBottom: '16px',
    },
    [theme.breakpoints.up('md')]:{
        width: '100%',
        marginTop: '24px',
        marginBottom: '40px'
    }
}))

export const ChatMenu = styled(Box)(()=>({
    flex: 4
}))

export const ChatBox = styled(Box)(()=>({
    flex: 8,
}))

export const ChatBoxBadge = styled(Box)(()=>({
    display: 'flex',
    width: '100%',
    background: '#dce0e6',
    paddingBottom: '16px',
    border: '1px solid grey',
    borderTopRightRadius: '3px',
    borderTopLeftRadius: '3px',
    marginBottom: '-1px'
}))

export const ChatBoxTop = styled(Box)(()=>({
    height: '400px',
    marginRight: '-2px',
    overflowY: 'scroll',
    paddingLeft: '16px',
    paddingRight: '16px',
    border: '1px solid grey',
    borderBottomRightRadius: '3px',
    borderBottomLeftRadius: '3px',
}))

export const ChatBoxBottom = styled(Box)(()=>({
    display: 'flex',
    gap: '8px',
    flexDirection: 'column',
    paddingRight: '16px',
    marginLeft: '-8px',
    marginTop: '8px',
    alignItems: 'end',
}))

export const DeletedMessage = styled(Box)(()=>({
    display: 'flex',
    marginTop: '16px',
    marginBottom: '16px'
}))

export const DeletedTypography = styled(Typography)(()=>({
    padding: '16px',
    borderRadius: '16px',
    marginTop: '32px',
    background: '#dce0e6'
}))

export const ChatTextArea = styled(TextField)(()=>({
    width: '98.8%',
    paddingTop: '8px'
}))

export const ChatWrapperBox = styled(Box)(()=>({
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    paddingRight: '24px',
    background: 'white',
    height: '100%'
}))

export const NoChatTypography = styled(Typography)(({theme})=>({
    margin: 'auto',
    marginTop: '150px',
    textAlign: 'center',
    opacity: '0.7',
    color: 'darkgrey',
    [theme.breakpoints.down('sm')]:{
        marginTop: '50px'
    }
}))