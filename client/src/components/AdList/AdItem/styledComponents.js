import {Box, Grid, IconButton, styled, Typography} from "@mui/material"

export const MainGrid = styled(Grid)(({theme})=>({
    padding: '16px',
    background: 'white',
    borderRadius: '4px',
    border: '1px solid #4e5052',
    [theme.breakpoints.down('sm')]:{
        marginBottom: '16px'
    }
}))

export const PhotoGrid = styled(Grid)(()=>({
    border: '1px solid #ebeded',
    cursor: 'pointer',
    borderRadius: '4px',
    overflow: 'hidden',
    maxHeight: '250px',
    '&:hover':{
        borderColor: '#455bed'
    }
}))

export const DescriptionGrid = styled(Grid)(({theme})=>({
    position: 'relative',
    height: 'auto',
    [theme.breakpoints.down('sm')]:{
        height: '170px'
    }
}))

export const TextName = styled(Typography)(({theme})=>({
    paddingRight: '16px',
    paddingLeft: '16px',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]:{
        marginTop: '16px'
    },
    '&:hover': {
        color: '#455bed'
    }
}))

export const LocationBox = styled(Box)(()=>({
    position: 'absolute',
    bottom: '-4px',
    left: '16px',
    display: 'flex',
    alignItems: 'end',
    flexWrap: 'wrap'
}))

export const TextDate = styled(Typography)(({theme})=>({
    marginBottom: '-4px',
    marginLeft: '8px',
    [theme.breakpoints.up('sm')]:{
        marginBottom: '4px'
    }
}))

export const PriceBox = styled(Box)(({theme})=>({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    paddingLeft: '8px',
    [theme.breakpoints.down('md')]:{
        paddingLeft: '24px'
    },
    [theme.breakpoints.down('sm')]:{
        paddingLeft: '16px',
        marginTop: '16px',
    }
}))

export const InnerPriceBox = styled(Box)(()=>({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end'
}))

export const PriceText = styled(Typography)(()=>({
    fontWeight: 'bold',
    marginRight: '5px'
}))

export const TypeDeal = styled(Typography)(({theme})=>({
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
        marginTop: '16px',
        marginLeft: '16px'
    }
}))

export const FavoriteButton = styled(IconButton)(()=>({
    position: 'absolute',
    bottom: '-10px',
    right: '10px'
}))