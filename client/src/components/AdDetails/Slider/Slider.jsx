import React, {useState} from 'react'
import {SliderWrapperBox,
    SliderBox,
    SliderIconArrow,
    SliderArrowSmallScreen,
    ArrowBox} from "./styledComponents"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import noPhoto from '../../../logotypes/noImage.png'

const Slider = ({images}) => {

    const [imageNum, setImageNum] = useState(0)

    const handleImageNum = (n) => {
        let num = imageNum + n
        if(num < 0) num = 0
        if(num > images.length - 1) num = images.length - 1
        setImageNum(num)
    }

    return (
        <SliderWrapperBox>
            <SliderBox>
                {images.length > 0 ? images?.map((f,i)=>(
                    <img key={i+Math.random()} src={f}
                         style={{
                             position: 'absolute',
                             objectFit: 'contain',
                             width: '100%',
                             height: '100%',
                             opacity: imageNum === i ? 1 : 0,
                             transition: 'all 0.4s ease'
                         }}
                    />
                )) :
                    <img
                        src={noPhoto}
                        style={{
                            position: 'absolute',
                            objectFit: 'contain',
                            width: '100%',
                            height: '100%',
                            transition: 'all 0.4s ease'
                        }}
                    />
                }
                <SliderIconArrow
                    sx={{
                        right: '10px',
                        opacity: images.length === 0 || imageNum === images?.length-1 ? 0.5 : 1
                    }}
                    onClick={()=>handleImageNum(1)}
                >
                    <ArrowForwardIosIcon fontSize='large'/>
                </SliderIconArrow>
                <SliderIconArrow
                    sx={{left: '10px',  opacity: images.length === 0 || imageNum === 0 ? 0.5 : 1}}
                    onClick={()=>handleImageNum(-1)}
                >
                    <ArrowBackIosNewIcon fontSize='large'/>
                </SliderIconArrow>
            </SliderBox>
            <SliderArrowSmallScreen>
                <ArrowBox
                    sx={{opacity: images.length === 0 || imageNum === 0 ? 0.4 : 1}}
                    onClick={()=>handleImageNum(-1)}
                >
                    <ArrowBackIosNewIcon fontSize='large'/>
                </ArrowBox>
                <ArrowBox
                    sx={{opacity: images.length === 0 || imageNum === images?.length-1 ? 0.4 : 1}}
                    onClick={()=>handleImageNum(1)}
                >
                    <ArrowForwardIosIcon fontSize='large'/>
                </ArrowBox>
            </SliderArrowSmallScreen>
        </SliderWrapperBox>
    )
}

export default Slider