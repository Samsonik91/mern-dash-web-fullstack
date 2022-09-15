import React, {useState} from 'react'
import {SettingItem, SettingItemBottom, SettingItemTop, InnerFieldBox, InnerFieldBoxItem} from "./styledComponents"
import {Button, Divider, IconButton, InputAdornment, TextField, Typography} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import {useDispatch, useSelector} from "react-redux"
import {cities} from "../../createAd/data"
import ClearIcon from "@mui/icons-material/Clear"
import {CityBox, LocationItem} from "../../createAd/Location/styledComponent"
import {changeLocation} from "../../../thunks/user"
import Swal from "sweetalert2"

const LocationSettings = ({changes, setChanges}) => {

    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('profile'))
    const result = user?.result

    const [location, setLocation] = useState(result?.location)
    const [showSetting, setShowSetting] = useState(false)
    const [helperText, setHelperText] = useState(false)
    const [showSelect, setShowSelect] = useState(false)
    const [matchCities, setMatchCities] = useState([])
    const [locError, setLocError] = useState(false)

    const disable = useSelector(({user})=> user.disable)

    const swall = (message, typeIcon='success') => Swal.fire({
        position: 'center',
        icon: typeIcon,
        title: message,
        showConfirmButton: false,
        timer: 3000
    })

    const handleHelperText = () => {
        if(location.length > 0) {
            const value = location.split(',')[0]

            for (let i = 0; i < cities.length; i++) {
                if (value === cities[i].name) {
                    setHelperText(false)
                    setLocError(false)
                    return false
                }
            }
            setHelperText(true)
            setLocError(true)
        }
    }

    const handleLocation = (e) => {
        let cityState = []
        let value = e.target.value
        let valueLow = value.toLowerCase()

        setLocation(value)

        if(value?.length > 2) {
            handleHelperText()
            setShowSelect(true)
            console.log(value)
            console.log(value.length)
            for (let i = 0; i < cities.length; i++) {
                const city = cities[i].name
                const region = cities[i].region
                const cityLow = cities[i].name.toLowerCase()
                const cityArr = cityLow.split('').slice(0, value.length).join('')
                if (cityArr === valueLow) {
                    const location = {city: city, region: region}
                    cityState.push(location)
                }
            }
        }else{
            if (showSelect) setShowSelect(false)
            cityState = []
        }

        setMatchCities(cityState)
    }

    const handleCity = (loc) => {
        setLocation(loc)
        setMatchCities([])
        setShowSelect(false)
        setHelperText(false)
        setLocError(false)
    }

    const handleClear = () => {
        setLocation('')
        setShowSelect(false)
        setHelperText(true)
        setLocError(true)
    }

    const sendLocation = async() => {
        if(location.length !== 0 && !locError){
            const message = await dispatch(changeLocation(location, result?._id))
            setLocation('')
            setShowSetting(false)
            await swall(message)
            setChanges(!changes)
        }else{
            return false
        }
    }

    return (
        <SettingItem sx={{paddingBottom: showSetting ? '8px' : '16px'}}>
            <SettingItemTop onClick={()=> setShowSetting(!showSetting)}>
                <Typography variant='h6'>
                    Изменить место нахождения
                </Typography>
                {showSetting ? <ExpandLessIcon fontSize='large'/> : <ExpandMoreIcon fontSize='large'/>}
            </SettingItemTop>
            <div style={{display: showSetting ? 'block' : 'none'}}>
                <Divider sx={{marginTop: '16px'}}/>
                <SettingItemBottom>
                    <form>
                        <InnerFieldBox>
                            <InnerFieldBoxItem>
                                <Typography variant='body1'>
                                    Новое место нахождения
                                </Typography>
                                <TextField
                                    value={location}
                                    error={locError}
                                    placeholder={'Населенный пункт'}
                                    onChange={handleLocation}
                                    helperText={helperText && 'Укажите свой нас. пункт'}
                                    fullWidth
                                    InputProps={location?.length > 0 ? {
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={handleClear}>
                                                    <ClearIcon/>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }: null }
                                />
                                <CityBox sx={{display: showSelect ? 'flex' : 'none'}}>
                                    {matchCities.map((m,i)=> (
                                        <LocationItem
                                            variant='body1'
                                            key={Math.random()+i}
                                            className='citiName'
                                            onClick={()=> handleCity(`${m.city}, ${m.region}`)}
                                        ><strong>{m.city}</strong>, <small>{m.region}</small></LocationItem>
                                    ))}
                                </CityBox>
                            </InnerFieldBoxItem>
                        </InnerFieldBox>
                        <Button
                            variant='contained'
                            type='submit'
                            disabled={disable}
                            onClick={sendLocation}
                            sx={{marginTop: '16px'}}
                        >
                            Подтвердить
                        </Button>
                    </form>
                </SettingItemBottom>
            </div>
        </SettingItem>
    )
}

export default LocationSettings