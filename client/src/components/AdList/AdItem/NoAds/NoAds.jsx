import React from 'react'
import {MainBox} from "./styledComponents"
import SadSmile from '../../../../logotypes/SadSmile.png'
import {Typography} from "@mui/material"

const NoAds = () => {
    return (
        <MainBox>
            <div>
                <img src={SadSmile} style={{width: '96px', color: 'grey'}}/>
            </div>
            <Typography variant='h6' color='grey'>
                Здесь покаместь нет объявлений
            </Typography>
        </MainBox>
    )
}

export default NoAds