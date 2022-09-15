import {Box, Button, Container, styled} from "@mui/material"

export const MainBox = styled(Container)(({theme})=>({
    width: '96%',
    background: 'white',
    borderRadius: '4px',
    display: 'flex',
    padding: '16px',
    marginTop: '16px',
    marginBottom: '16px',
    flexDirection: 'column',
    gap: '16px',
    [theme.breakpoints.down('sm')]:{
        width: '94%'
    }
}))

export const ChatMenu = styled(Box)(({theme})=>({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    height: '250px',
    overflow: 'scroll',
    border: '1px solid gray',
    borderRadius: '4px',
    [theme.breakpoints.down('sm')]:{
        marginBottom: '8px'
    }
}))

export const ChatBox = styled(Box)(()=>({
    display: 'flex',
    flexDirection: 'column'
}))

export const ChatMessagesBox = styled(Box)(()=>({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '350px',
    overflow: 'scroll',
    border: '1px solid gray',
}))

export const CreateBox = styled(Box)(()=>({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
}))

export const MessageButton = styled(Button)(()=>({
    marginTop: '16px',
    width: '150px'
}))

