import {Avatar, Box, Button, styled} from "@mui/material"

export const PhotoBox = styled(Box)(()=>({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
}))

export const PhotoButtons = styled(Box)(()=>({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '8px'
}))

export const ProfileAvatar = styled(Avatar)(()=>({
    width: '112px',
    height: '112px'
}))

export const ButtonBox = styled(Box)(()=>({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
}))

export const AvatarButton = styled(Button)(()=>({
    marginRight: '24px',
    paddingTop: 0,
    paddingBottom: 0
}))