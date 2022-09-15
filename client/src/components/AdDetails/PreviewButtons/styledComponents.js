import {Box, Button, styled} from "@mui/material"

export const PreviewButtonsBox = styled(Box)(({theme})=>({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '16px',
    background: 'white',
    paddingTop: '16px',
    paddingBottom: '16px',
    borderRadius: '4px',
    [theme.breakpoints.down('sm')]:{
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center'
    }
}))

export const ButtonToBackForm = styled(Button)(({theme})=>({
    color: 'black',
    border: '1px solid black',
    width: 'auto',
    marginLeft: '16px',
    [theme.breakpoints.down('sm')]:{
        width: '90%',
        marginLeft: '0px'
    }
}))

export const ButtonToConfirm = styled(Button)(({theme})=>({
    marginRight: '16px',
    width: 'auto',
    [theme.breakpoints.down('sm')]:{
        width: '90%',
        marginRight: '0px'
    }
}))