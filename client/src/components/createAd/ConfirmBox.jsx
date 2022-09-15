import React from 'react'
import {Box, Button, styled} from "@mui/material"

const MainBox = styled(Box)(({theme})=>({
    background: 'white',
    padding: '32px',
    marginTop: '16px',
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]:{
        padding: '16px'
    }
}))

const InnerBox = styled(Box)(()=>({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}))

const PreviewButton = styled(Button)(()=>({
    color: 'black',
    border: '1px solid black'
}))

const ConfirmBox = ({handleSubmit}) => {
    return (
        <MainBox>
            <InnerBox>
                <Box>
                    <PreviewButton
                        variant='outlined'
                        type='submit'
                        onClick={(e)=> handleSubmit(e, 'preview')}
                    >Предпросмотр</PreviewButton>
                </Box>
                <Box>
                    <Button
                        variant='contained'
                        type='submit'
                        onClick={(e)=> handleSubmit(e, 'createAd')}
                    >Опубликовать</Button>
                </Box>
            </InnerBox>
        </MainBox>
    )
}

export default ConfirmBox