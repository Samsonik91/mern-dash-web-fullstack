import {Box, Container, styled} from "@mui/material"

export const MainContainer = styled(Container)(({theme})=>({
    width: '100%',
    border: '1px solid #b0b7c2',
    opacity: 0.7,
    background: 'white',
    borderRadius: '5px',
    display: 'flex',
    paddingTop: '16px',
    paddingBottom: '16px',
    [theme.breakpoints.down('sm')]:{
        flexDirection: 'column',
        gap: '24px'
    }
}))

export const PhotoContainer = styled(Box)(({theme})=>({
    flex: 4,
    [theme.breakpoints.up('md')]:{
        flex: 3
    },
    [theme.breakpoints.down('sm')]:{
        marginBottom: '24px'
    }
}))

export const PhotoBox = styled(Box)(({theme})=>({
    background: '#d3dbdb',
    height: '250px',
    width: 'calc(100% + 8px)',
    borderRadius: '4px',
    [theme.breakpoints.up('sm')]:{
        marginLeft: '-8px',
    },
    [theme.breakpoints.down('sm')]:{
        width: '100%'
    }
}))

export const NameContainer = styled(Box)(({theme})=>({
    flex: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'start',
    [theme.breakpoints.down('md')]:{
        flex: 6
    },
    [theme.breakpoints.down('sm')]:{
        gap: '8px',
        marginBottom: '24px'
    }
}))

export const NameBox = styled(Box)(({theme})=>({
    width: '95%',
    background: '#d3dbdb',
    height: '32px',
    borderRadius: '4px',
    [theme.breakpoints.up('sm')]:{
        marginLeft: '16px'
    },
    [theme.breakpoints.down('sm')]:{
        marginBottom: '8px'
    }
}))

export const LocationBox = styled(Box)(({theme})=>({
    width: '60%',
    background: '#d3dbdb',
    borderRadius: '4px',
    height: '32px',
    [theme.breakpoints.up('sm')]:{
        marginLeft: '16px'
    }
}))

export const PriceContainer = styled(Box)(({theme})=>({
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]:{
        flex: 2
    },
    [theme.breakpoints.up('sm')]:{
        paddingLeft: '32px'
    }
}))

export const PriceBox = styled(Box)(({theme})=>({
    marginRight: '-8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    [theme.breakpoints.down('sm')]:{
        alignItems: 'start'
    }
}))

export const NumberPrice = styled(Box)(({theme})=>({
    width: '100%',
    height: '40px',
    background: '#d3dbdb',
    borderRadius: '4px',
    [theme.breakpoints.down('sm')]:{
        width: '25%',
        marginBottom: '8px'
    },
    [theme.breakpoints.up('sm')]:{
        marginRight: '-8px'
    }
}))

export const DealBox = styled(Box)(({theme})=>({
    marginRight: '-8px',
    width: '100%',
    height: '16px',
    background: '#d3dbdb',
    borderRadius: '4px',
    [theme.breakpoints.down('sm')]:{
        width: '30%',
    }
}))

export const IconBox = styled(Box)(({theme})=>({
    textAlign: 'end',
    position: 'absolute',
    right: '8px',
    bottom: '0px'
}))