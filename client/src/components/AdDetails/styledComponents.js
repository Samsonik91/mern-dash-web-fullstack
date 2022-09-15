import {Box, Grid, styled} from "@mui/material"

export const MainGrid = styled(Grid)(({theme})=>({
    margin: 'auto',
    [theme.breakpoints.up('sm')]:{
        marginTop: '16px'
    }
}))

export const AdGrid = styled(Grid)(({theme})=>({
    padding: '16px',
    [theme.breakpoints.up('sm')]:{
        padding: '8px',
        marginBottom: '16px'
    }
}))

export const AdBox = styled(Box)(()=>({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
}))

export const ProfileGrid = styled(Grid)(({theme})=>({
    padding: '8px',
    [theme.breakpoints.down('sm')]:{
        padding: '16px',
        marginTop: '-16px',
    }
}))