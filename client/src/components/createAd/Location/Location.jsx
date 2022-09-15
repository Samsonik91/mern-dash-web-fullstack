import React, {useState} from 'react'
import {IconButton, InputAdornment} from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear'
import {cities} from "../data"
import {CityBox, LocationBox, LocationInput, LocationItem} from "./styledComponent"

const Location = ({postData, setPostData, locError, setLocError, isPrompt, setIsPrompt}) => {

    const [helperText, setHelperText] = useState(false)
    const [showSelect, setShowSelect] = useState(false)
    const [matchCities, setMatchCities] = useState([])

    const handleHelperText = () => {
        if(postData.location.length > 0) {
            const value = postData.location.split(',')[0]
            console.log(value)
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
        if(!isPrompt) setIsPrompt(true)
        let cityState = []
        let value = e.target.value
        let valueLow = value.toLowerCase()

        setPostData({...postData, location: value})

        if(value.length > 2) {
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
        setPostData({...postData, location: loc})
        setMatchCities([])
        setShowSelect(false)
        setHelperText(false)
        setLocError(false)
    }

    const handleClear = () => {
        setPostData({...postData, location: ''})
        setShowSelect(false)
        setHelperText(true)
        setLocError(true)
    }

    return (
        <LocationBox>
            <LocationInput
                value={postData.location}
                label = {locError ? '' : null}
                error={locError}
                onChange={handleLocation}
                helperText={helperText && 'Укажите свой нас. пункт'}
                placeholder={'Населенный пункт'}
                InputProps={postData.location.length > 0 ? {
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
        </LocationBox>
    )
}

export default Location