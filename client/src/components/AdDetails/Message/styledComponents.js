import {Box, Button, styled, TextField} from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";

export const MessageBox = styled(Box)(()=>({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    marginTop: '16px',
    paddingTop: '16px',
    paddingBottom: '56px',
    background: 'white',
    borderRadius: '4px'
}))

export const ContactBox = styled(Box)(({theme})=>({
    width: '95%',
    marginBottom: '16px',
    display: 'flex',
    [theme.breakpoints.down('sm')]:{
        flexDirection: 'column',
        gap: '16px',
        width: '90%'
    }
}))

export const AvatarBox = styled(Box)(()=>({
    display: 'flex',
    alignItems: 'center'
}))

export const StyledAccount = styled(AccountCircleIcon)(()=>({
    color: '#54595c',
    fontSize: '48px',
    marginRight: '8px'
}))

export const PhoneBox = styled(Box)(({theme})=>({
    display: 'flex',
    alignItems: 'center',
    marginRight: '8px',
    [theme.breakpoints.down('sm')]:{
        marginBottom: '16px'
    }
}))

export const StyledPhoneIcon = styled(LocalPhoneRoundedIcon)(()=>({
    color: '#54595c',
    padding: '8px',
    marginRight: '8px',
    fontSize: '28px',
    border: '1px solid #54595c',
    borderRadius: '50%'
}))

export const MessageField = styled(TextField)(({theme})=>({
    background: '#edf2f2',
    width: '94%',
    marginBottom: '8px',
    [theme.breakpoints.down('md')]:{
        width: '90%'
    }
}))

export const MessageButton = styled(Button)(({theme})=>({
    position: 'absolute',
    right: '24px',
    bottom: '16px',
    [theme.breakpoints.down('sm')]:{
        right: '16px'
    }
}))