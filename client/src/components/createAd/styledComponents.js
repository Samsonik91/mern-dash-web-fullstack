import {Box, Container, styled} from "@mui/material"

export const MainBox = styled(Box)(()=>({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}))

export const MainContainer = styled(Container)(()=>({
    margin: '16px',
    mt: '32px'
}))

export const InnerBox = styled(Box)(()=>({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around'
}))