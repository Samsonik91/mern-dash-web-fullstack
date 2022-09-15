import {Box, styled, TextField, Typography} from "@mui/material"

export const LocationBox = styled(Box)(()=>({
    maxWidth: '300px',
    width: '100%',
}))

export const LocationInput = styled(TextField)(()=>({
    width: 'calc(100% + 2px)',
    marginBottom: '16px',
    marginTop: '8px'
}))

export const CityBox = styled(Box)(()=>({
    width: '100%',
    maxHeight: '180px',
    overflow: 'scroll',
    flexDirection: 'column',
    alignItems: 'start',
    background: 'white',
    border: '1px solid gray',
    borderTopColor: 'white',
    paddingTop: '16px',
    paddingBottom: '8px',
    mt: '-18px'
}))

export const LocationItem = styled(Typography)(()=>({
    padding: '8px',
    width: '100%',
    '&:hover':{
        background: '#daecf2',
        cursor: 'pointer'
    }
}))