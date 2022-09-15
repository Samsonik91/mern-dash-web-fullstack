import {Box, Button, FormControlLabel, styled, Typography} from "@mui/material"

export const MainBox = styled(Box)(()=>({
    background: 'white',
    padding: '32px',
    marginBottom: '16px',
    borderRadius: '16px'
}))

export const InnerBox =styled(Box)(()=>({
    width: '285px',
    display: 'flex',
    flexDirection: 'column'
}))

export const PriceFieldBox = styled(Box)(()=>({
    marginTop: '32px',
    justifyContent: 'space-between'
}))

export const HaggleBox = styled(Box)(()=>({
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '104%'
}))

export const TypeBox = styled(Box)(()=>({
    display: 'flex',
    justifyContent: 'space-between'
}))

export const TypeButton = styled(Button)(()=>({
    width: '135px',
    fontSize: '12px'
}))

export const DeliverySwitch = styled(Box)(()=>({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '104%'
}))

export const DeliveryBox = styled(Box)(()=>({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '24px'
}))

export const DeliveryFormControl = styled(FormControlLabel)(()=>({
    marginLeft: '80px',
    display: 'flex',
    justifyContent: 'space-between'
}))

export const DeliveryTypography = styled(Typography)(()=>({
    width: '100%',
    color: '#49524b'
}))