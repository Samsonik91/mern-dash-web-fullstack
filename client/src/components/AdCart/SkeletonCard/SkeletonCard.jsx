import React from 'react'
import {Box} from "@mui/material"
import {
    MainBox,
    NameSkeleton,
    StyledCircular,
    WrapperBox,
    StyledCardMedia,
    InnerBox3,
    InnerBox1,
    InnerBox2
} from "./styledComponents"

const SkeletonCard = () => {
    return (
        <MainBox>
            <WrapperBox>
                <StyledCardMedia>
                    <StyledCircular
                        color='primary'
                        thickness={5}
                        size={60}
                    />
                </StyledCardMedia>
                <NameSkeleton/>
                <Box sx={{marginTop: '32px'}}>
                    <InnerBox1/>
                    <InnerBox2/>
                    <InnerBox3/>
                </Box>
            </WrapperBox>
        </MainBox>
    )
}

export default SkeletonCard