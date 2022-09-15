import {Avatar, Box, styled} from "@mui/material"

export const ConversationBox = styled(Box)(({theme})=>({
    position: 'relative',
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    marginTop: '16px',
    cursor: 'pointer',
    borderRadius: '3px',
    '&:hover':{
        background: '#dce0e6'
    },
    [theme.breakpoints.down('sm')]:{
        width: '90%'
    },
    [theme.breakpoints.up('md')]:{
        width: '100%'
    }
}))

export const ConversationAvatar = styled(Avatar)(()=>({
    width: '60px',
    height: '60px',
    marginRight: '8px'
}))

export const NameBox = styled(Box)(({theme})=>({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]:{
        justifyContent: 'start'
    }
}))