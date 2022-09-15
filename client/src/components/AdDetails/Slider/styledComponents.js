import {Box, IconButton, styled} from "@mui/material"

export const SliderWrapperBox = styled(Box)(({theme})=>({
    background: 'white',
    width: '100%',
    borderRadius: '4px',
    marginBottom: '16px',
    paddingBottom: '32px',
    paddingTop: '32px',
    [theme.breakpoints.down('sm')]:{
        paddingBottom: '16px',
        paddingTop: '16px'
    }
}))

export const SliderBox = styled(Box)(({theme})=>({
    width: '100%',
    height: '500px',
    position: 'relative',
    overflow: 'hidden',
    background: 'white',
    [theme.breakpoints.down('md')] : {
        height: '400px',
        width: '90%',
        margin: 'auto'
    },
    [theme.breakpoints.down('sm')] : {
        height: '300px',
        width: '90%',
        margin: 'auto'
    }
}))

export const SliderIconArrow = styled(IconButton)(({theme})=>({
    position: 'absolute',
    zIndex: 3,
    cursor: 'pointer',
    color: 'gray',
    top: '50%',
    transform: 'translateY(-50%)',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]:{
        display: 'none'
    }
}))

export const SliderArrowSmallScreen = styled(Box)(({theme})=>({
    marginTop: '16px',
    display: 'none',
    width: '100%',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]:{
        display: 'flex'
    }
}))

export const ArrowBox = styled(Box)(()=>({
    border: '1px solid black',
    margin: '16px'
}))