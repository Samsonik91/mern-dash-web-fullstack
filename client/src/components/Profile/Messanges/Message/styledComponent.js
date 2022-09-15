import {Avatar, Box, styled, Typography} from "@mui/material"

export const MessageBox = styled(Box)(()=>({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '16px',
    padding: '8px',
    borderRadius: '8px',
}))

export const MessageTop = styled(Box)(()=>({
    display: 'flex'
}))

export const MessageAvatar = styled(Avatar)(()=>({
    width: '36px',
    height: '36px',
    marginRight: '8px'
}))

export const MessageTypography = styled(Typography)(()=>({
    marginTop: '32px',
    padding: '16px',
    borderRadius: '16px',
    color: 'white',
    maxWidth: '300px',
}))

export const DeleteIcon = styled(Box)(()=>({
    width: '36px',
    height: '36px',
    marginTop: '8px',
    marginLeft: '-16px',
    overflow: 'hidden',
    background: 'white',
    borderRadius: '50%',
    color: '#393b3d'
}))

export const MessageBottom = styled(Typography)(()=>({
    marginTop: '8px',
    maxWidth: '360px',
    textAlign: 'end'
}))