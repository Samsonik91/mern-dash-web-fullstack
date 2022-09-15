import React, {useEffect, useRef, useState} from 'react'
import {Box, MenuItem, Typography} from "@mui/material"
import {categories} from "../data"
import {MainBox, NameField} from "./styledComponents"

const NameBox = ({postData,
                     nameError,
                     catError,
                     setPostData,
                     setNameError,
                     setCatError,
                     isPrompt,
                     setIsPrompt
                 }) => {

    const [nameCount, setNameCount] = useState(70)
    const [nameHelperText, setNameHelperText] = useState(false)
    const [catFocus, setCatFocus] = useState(false)
    const [label, setLabel] = useState('Укажите категорию')
    const catRef = useRef()

    const handleName = (e) => {
        setPostData({...postData, name: e.target.value})
        if(!isPrompt) setIsPrompt(true)
        setNameHelperText(true)
        if(70 - e.target.value.length  < 0) {
            return false
        }
        setNameCount(70 - e.target.value.length)
    }

    const handleNameHelperText = () => {
        if(!nameError && postData.name.length >= 10 &&
            !nameError && postData.name.length <= 70){
            setNameHelperText(false)
            setNameError(false)
        }else{
            setNameError(true)
            setNameHelperText(true)
        }
    }

    useEffect(()=>{
        if(postData.name.length > 0) {
            if(postData.name.length < 10 || postData.name.length > 70){
                setNameError(true)
            }else{
                setNameError(false)
            }
        }
    },[postData.name])

    const handleCategory = (e) => {
        setLabel(null)
        setPostData({...postData, category: e.target.value})
        if(!isPrompt) setIsPrompt(true)
        setCatError(false)
    }

    const handleCatFocus = () => {
        setCatFocus(true)
    }

    useEffect(()=>{
        if(catFocus) {
            if (postData.category.length === 0) {
                setCatError(true)
            } else {
                setCatError(false)
            }
        }
    },[postData.category, catFocus])

    useEffect(()=>{
        postData.category.name && setLabel(postData.category.name)
    },[postData.category])

    return (
        <MainBox>
            <Box>
                <Typography variant='h6'>
                    Название
                </Typography>
                <NameField
                    value={postData.name}
                    error={nameError}
                    variant='outlined'
                    label={nameError ? 'Не менее 10 и не более 80 символов' : null}
                    size='large'
                    onChange={handleName}
                    onBlur={handleNameHelperText}
                    helperText={nameHelperText && `Осталось ${nameCount} символов`}
                    placeholder={'Укажите название'}
                />
            </Box>
            <Box>
                <Typography variant='h6'>
                    Категория
                </Typography>
                <NameField
                    value={postData.category.name}
                    ref={catRef}
                    error={catError}
                    variant='outlined'
                    label={label}
                    select
                    size='large'
                    helperText={catError ? 'Выберите одну из категорий' : null}
                    placeholder={postData.category.name ? postData.category.name : 'Укажите категорию'}
                    onChange={handleCategory}
                    onFocus={handleCatFocus}
                >
                    {categories.map((option)=>(
                        <MenuItem key={Math.random()+Math.random()} value={option}>
                            {option.name}
                        </MenuItem>
                    ))}
                </NameField>
            </Box>
        </MainBox>
    )
}

export default NameBox