import {Box, styled} from "@mui/material"

export const MainBox = styled(Box)(()=>({
    maxWidth: '500px',
    height: '300px',
    width: '100%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '32px',
    marginTop: '40px',
    background: 'white',
    borderRadius: '5px'
}))