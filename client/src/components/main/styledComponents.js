import {Grid, IconButton, styled} from "@mui/material"

export const MainGrid = styled(Grid)(()=>({
    textAlign: 'center',
    marginTop: '24px',
    marginBottom: '24px'
}))

export const ButtonField = styled(IconButton)(()=>({
    border: '1px solid #788281',
    color: '#788281',
    cursor: 'pointer'
}))