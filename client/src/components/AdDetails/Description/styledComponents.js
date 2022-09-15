import {Box, styled} from "@mui/material"

export const DescriptionBox = styled(Box)(()=>({
    background: 'white',
    width: '100%',
    borderRadius: '4px',
    paddingTop: '16px',
    paddingBottom: '16px'
}))

export const DateBox = styled(Box)(({theme})=>({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '16px',
    marginLeft: '16px',
    [theme.breakpoints.up('sm')]:{
        marginRight: '32px',
        marginLeft: '32px'
    }
}))

export const BottomBox = styled(Box)(({theme})=>({
    [theme.breakpoints.up('sm')]:{
        marginRight: '16px',
        marginLeft: '16px'
    }
}))

export const PriceBox = styled(Box)(()=>({
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'end'
}))

export const CharacterBox = styled(Box)(()=>({
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    gap: '8px',
    marginRight: '16px',
    marginLeft: '16px'
}))

export const CharacterMiniBox = styled(Box)(({theme})=>({
    border: '1px solid black',
    borderRadius: '3px',
    padding: '8px',
    [theme.breakpoints.down('sm')]:{
        marginRight: '8px',
        marginBottom: '8px'
    }
}))