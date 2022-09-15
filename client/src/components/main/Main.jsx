import React, {useState} from 'react'
import {Box, styled} from "@mui/material"
import CategoryField from "./CategoryField"
import RecentAds from "./RecentAds/RecentAds"

const MainBox = styled(Box)(({theme})=>({
    width: '90%',
    margin: 'auto',
    marginBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]:{
        width: '100%'
    },
    [theme.breakpoints.up('lg')]:{
        width: '100%'
    }
}))


const Main = () => {

    const [blockWidth, setBlockWidth] = useState(null)

    return (
        <MainBox maxWidth='1050px'>
            <CategoryField setBlockWidth={setBlockWidth}/>
            <RecentAds blockWidth={blockWidth}/>
        </MainBox>
    )
}

export default Main