import {Box, styled} from "@mui/material"

export const ProfileBox = styled(Box)(({theme})=>({
    background: 'white',
    width: 'calc(100%-16px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '4px',
    padding: '16px',
    gap: '16px',
    [theme.breakpoints.down('sm')]:{
        paddingRight: '8px',
        paddingLeft: '8px'
    }
}))

export const RowToAds = styled(Box)(()=>({
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'end',
    marginTop: '32px',
    cursor: 'pointer',
    '&:hover': {
        color: '#1a54b0'
    }
}))

export const DeliveryBox = styled(Box)(()=>({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    background: 'white',
    marginTop: '16px',
    padding: '16px',
    borderRadius: '4px'
}))

export const ItemDelivery = styled(Box)(()=>({
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    marginTop: '16px'
}))

export const LocationBox = styled(Box)(()=>({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '16px',
    width: '100%'
}))

export const LocationTypographies = styled(Box)(()=>({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start'
}))