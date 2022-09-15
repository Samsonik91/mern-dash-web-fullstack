import {Box, Container, Grid, styled} from "@mui/material"

export const MainGrid = styled(Grid)(({theme})=>({
    width: '100%',
    height: '80px',
    background: 'white',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]:{
        height: '150px'
    }
}))

export const InnerGrid = styled(Grid)(()=>({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
}))

export const AdContainer = styled(Container)(({theme})=>({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]:{
        marginTop: '16px'
    }
}))

export const MainBox = styled(Box)(({theme})=>({
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
}))