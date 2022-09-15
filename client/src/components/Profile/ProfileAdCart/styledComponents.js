import {Box, Button, Grid, styled, Typography} from "@mui/material"

export const MainCardBox = styled(Box)(()=>({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '16px',
    background: 'white',
    borderRadius: '5px',
    padding: '16px',
    paddingBottom: '8px',
    border: '1px solid black'
}))

export const ImageBox = styled(Box)(({theme})=>({
    overflow: 'hidden',
    border: '1px solid lightgrey',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    '&:hover':{
        border: '2px solid #5b74d9'
    },
    [theme.breakpoints.up('sm')]:{
        height: '200px',
        width: '200px'
    }
}))

export const LocationBox = styled(Box)(({theme})=>({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'end',
    marginTop: 0,
    [theme.breakpoints.down('md')]:{
        flexDirection: 'column',
        alignItems: 'start'
    },
    [theme.breakpoints.down('sm')]:{
        marginTop: '16px'
    }
}))

export const LocationTypography = styled(Typography)(({theme})=>({
    marginBottom: '5px',
    [theme.breakpoints.up('md')]:{
        marginLeft: '8px'
    }
}))

export const CardDescription = styled(Box)(({theme})=>({
    height: '99%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginLeft: '16px',
    borderBottom: '1px solid #9b9ea3',
    [theme.breakpoints.down('sm')]:{
        borderBottom: 'none',
        marginTop: '16px'
    }
}))

export const NameTypography = styled(Typography)(({theme})=>({
    cursor: 'pointer',
    '&:hover':{
        color: '#5b74d9'
    },
    [theme.breakpoints.down('sm')]:{
        marginTop: '16px'
    }
}))

export const PriceGrid = styled(Grid)(({theme})=>({
    borderBottom: '1px solid #9b9ea3',
    marginBottom: '1px',
    [theme.breakpoints.down('sm')]:{
        paddingLeft: '16px'
    }
}))

export const PriceBox = styled(Box)(({theme})=>({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]:{
        flexDirection: 'row',
        alignItems: 'end',
        marginTop: '32px',
    }
}))

export const HaggleTypography = styled(Typography)(()=>({
    textAlign: 'center',
    marginLeft: '16px'
}))

export const UpdatingBox = styled(Box)(({theme})=>({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '8px',
    [theme.breakpoints.down('sm')]:{
        flexDirection: 'column',
        alignItems: 'start',
        marginLeft: '16px'
    }
}))

export const ButtonBox = styled(Box)(({theme})=>({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    marginBottom: '8px',
    marginTop: '8px',
    [theme.breakpoints.down('sm')]:{
        marginLeft: '50%',
        transform: 'translateX(-53%)',
        marginTop: '16px'
    }
}))

export const UpdateButton = styled(Button)(()=>({
    color: 'black',
    borderColor: 'black',
    '&:hover':{
        color: '#0d2482',
        borderColor: '#0d2482'
    }
}))

export const IdTypography = styled(Typography)(({theme})=>({
    [theme.breakpoints.up('sm')]:{
        marginBottom: '32px'
    }
}))