import {Box, CircularProgress, styled} from "@mui/material"

export const MainBox = styled(Box)(()=>({
    width: '100%',
    opacity: '0.7'
}))

export const WrapperBox = styled(Box)(()=>({
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '8px',
    borderRadius: '4px'
}))

export const StyledCardMedia = styled(Box)(({theme})=>({
    background: '#d3dbdb',
    height: '200px',
    width: '100%',
    margin: 'auto',
    cursor: 'pointer',
    borderRadius: '3px',
    position: 'relative',
    [theme.breakpoints.down('sm')]:{
        marginBottom: '8px'
    }
}))

export const StyledCircular = styled(CircularProgress)(()=>({
    position: 'absolute',
    top: '37%',
    left: '37%'
}))

export const NameSkeleton = styled(Box)(()=>({
    height: '32px',
    background: '#d3dbdb',
    borderRadius: '4px'
}))

export const InnerBox1 = styled(Box)(()=>({
    width: '33%',
    height: '24px',
    background: '#d3dbdb',
    borderRadius: '4px'
}))

export const InnerBox2 = styled(Box)(()=>({
    width: '50%',
    height: '24px',
    background: '#d3dbdb',
    borderRadius: '4px',
    marginTop: '8px'
}))

export const InnerBox3 = styled(Box)(()=>({
    width: '66%',
    height: '16px',
    background: '#d3dbdb',
    borderRadius: '4px',
    marginTop: '8px'
}))