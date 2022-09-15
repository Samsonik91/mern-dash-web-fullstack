import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Typography} from "@mui/material"
import {ButtonField, MainGrid} from "./styledComponents"

const FieldGrid = ({child, text, category}) => {

    const navigate = useNavigate()

    const handleAdsByCategory = (category, navigate) => {
        navigate(`/adList/category?category=${category}&page=1`)
    }

    return (
        <MainGrid item  xs={4} sm={3} md={2}>
                <ButtonField
                    onClick={()=> handleAdsByCategory(category, navigate)}
                >
                    {child}
                </ButtonField>
                <Typography
                    variant='body2'
                    color='black'
                    onClick={()=> handleAdsByCategory(category, navigate)}
                    sx={{cursor: 'pointer'}}
                >{text}</Typography>
        </MainGrid>
    )
}

export default FieldGrid