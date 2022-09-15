import React, {useEffect, useRef} from 'react'
import {Container, Grid, IconButton, styled} from "@mui/material"
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import BuildIcon from '@mui/icons-material/Build'
import WorkIcon from '@mui/icons-material/Work'
import SportsHandballIcon from '@mui/icons-material/SportsHandball'
import PetsIcon from '@mui/icons-material/Pets'
import PeopleIcon from '@mui/icons-material/People'
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly'
import FastfoodIcon from '@mui/icons-material/Fastfood'
import ChairIcon from '@mui/icons-material/Chair'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import FieldGrid from "./FieldGrid"

const FieldBox = styled(Container)(({theme})=>({
    background: 'white',
    padding: '16px',
    marginTop: '24px',
    marginBottom: '24px',
    marginLeft: '24px',
    marginRight: '24px',
    borderRadius: '5px',
    [theme.breakpoints.down("md")]:{
        width: '90%'
    }
}))


const CategoryField = ({setBlockWidth}) => {

    const catRef = useRef(null)

    window.onresize = () => {
        setBlockWidth(catRef.current.offsetWidth)
    }

    useEffect(()=>{
        setBlockWidth(catRef.current.offsetWidth)
    },[])

    return (
        <FieldBox sx={{width: '100%'}} ref={catRef}>
            <Grid container sx={{width: '100%'}}>
                <FieldGrid child={<HomeWorkIcon/>} text='Недвижимость' category='real_estate'/>
                <FieldGrid child={<DirectionsCarIcon/>} text='Транспорт' category='transport'/>
                <FieldGrid child={<BuildIcon/>} text='Запчасти' category='spare_parts'/>
                <FieldGrid child={<CheckroomIcon/>} text='Одежда и обувь' category='clothes_and_shoes'/>
                <FieldGrid child={<WorkIcon/>} text='Работа' category='job'/>
                <FieldGrid child={<PhoneIphoneIcon/>} text='Электроника и аксессуары' category='electronic_and_accessories'/>
                <FieldGrid child={<ChairIcon/>} text='Дом и сад' category='home_and_garden'/>
                <FieldGrid child={<PeopleIcon/>} text='Услуги' category='services'/>
                <FieldGrid child={<SportsHandballIcon/>} text='Спорт и досуг' category='sport_and_leisure'/>
                <FieldGrid child={<PetsIcon/>} text='Животные' category='animals'/>
                <FieldGrid child={<ChildFriendlyIcon/>} text='Детский Мир' category='children'/>
                <FieldGrid child={<FastfoodIcon/>} text='Продукты питания' category='food_and_drink'/>
            </Grid>
        </FieldBox>
    )
}

export default CategoryField