import React, {useEffect, useState} from 'react'
import {
    Button,
    ButtonGroup,
    Checkbox,
    FormControl,
    FormGroup,
    FormHelperText,
    FormLabel,
    MenuItem,
    Switch,
    TextField,
    Typography
} from "@mui/material"
import {
    DeliveryBox, DeliveryFormControl,
    DeliverySwitch,
    DeliveryTypography,
    HaggleBox,
    InnerBox,
    MainBox,
    PriceFieldBox,
    TypeBox,
    TypeButton
} from "./styledComponents"

const PriceBox = ({postData, setPostData, priceError, setPriceError, isPrompt, setIsPrompt}) => {

    const [currency, setCurrency] = useState(postData.currency)
    const [buttonValue, setButtonValue] = useState(postData.typeDeal)
    const [priceClick, setPriceClick] = useState(false)
    const [checkedServices, setCheckedServices] = useState({
        UkrPoshta: postData.postServices.includes('UkrPoshta') ? true : false,
        NovaPoshta: postData.postServices.includes('NovaPoshta') ? true : false,
        Justin: postData.postServices.includes('Justin') ? true : false,
        Meest: postData.postServices.includes('Meest') ? true : false
    })

    const services = postData.postServices

    useEffect(()=>{
        setButtonValue(postData.typeDeal)
    },[postData])

    useEffect(()=>{
        if(services && services.length > 0){
            setCheckedServices({
                UkrPoshta: services.includes('UkrPoshta') ? true : false,
                NovaPoshta: services.includes('NovaPoshta') ? true : false,
                Justin: services.includes('Justin') ? true : false,
                Meest: services.includes('Meest') ? true : false
            })
        }else{
            setCheckedServices({
                UkrPoshta: false,
                NovaPoshta: false,
                Justin: false,
                Meest: false
            })
        }
    },[services])

    const currencies = [{value: 'usd', label: '$'}, {value: '€', label: '€'}, {value: 'грн', label: 'грн'}]
    const buttons = [
        {value: 'price', name: 'Цена'},
        {value: 'change', name: 'Обмен'},
        {value: 'free', name: 'Даром'}
    ]
    const {UkrPoshta, NovaPoshta, Justin, Meest} = checkedServices
    const error = [UkrPoshta, NovaPoshta, Justin, Meest].filter((v) => v).length < 1

    const handleButtonValue = (value) => {
        setButtonValue(value)
        setPostData({...postData, typeDeal: value})
        if(!isPrompt) setIsPrompt(true)
    }

    const handlePrice = (e) => {
        setPostData({...postData, price: e.target.value})
        if(!isPrompt) setIsPrompt(true)
        setPriceClick(true)
    }

    const handlePriceClick = () => {
        setPriceClick(true)
    }

    const handlePriceError = () => {
        if(priceClick) {
            if (postData.typeDeal === 'price' && postData.price.length < 1 ||
                postData.typeDeal === 'price' && postData.price.length > 10) {
                setPriceError(true)
            } else {
                setPriceError(false)
                setPriceClick(false)
            }
        }else{
            setPriceError(false)
        }
    }

    useEffect(()=>{
        if(priceClick) handlePriceError()
    },[postData.price])

    useEffect(()=>{
        if(priceClick) handlePriceError()
    },[postData.typeDeal])

    const handleHaggle = () => {
        setPostData({...postData , haggle: !postData.haggle})
    }

    const handleCurrencyChange = (event) => {
        const value = event.target.value
        setCurrency(value)
        setPostData({...postData, currency: value})
        if(!isPrompt) setIsPrompt(true)
    }

    const handleBusiness = (value) => {
        setPostData({...postData, isBusiness: value})
        if(!isPrompt) setIsPrompt(true)
    }

    const handleIsNewItem = (value) => {
        setPostData({...postData, isNewItem: value})
        if(!isPrompt) setIsPrompt(true)
    }

    const handleIsDelivery = () => {
        setPostData({...postData, delivery: !postData.delivery})
        if(!isPrompt) setIsPrompt(true)
    }

    const handleChange = (e) => {
        const name = e.target.name
        setCheckedServices({
            ...checkedServices,
            [name]: e.target.checked,
        })
        if(postData.postServices.includes(name)){
            setPostData({...postData, postServices: postData.postServices.filter(item=> item !== name)})
            if(!isPrompt) setIsPrompt(true)
        }else{
            setPostData({...postData, postServices: [...postData.postServices, name]})
            if(!isPrompt) setIsPrompt(true)
        }
    }

    return (
        <MainBox>
            <InnerBox>
                <ButtonGroup>
                    {buttons.map((item, i)=>(
                        <Button
                            key={i}
                            value={item.value}
                            sx={{width: '95px', color: item.value !== buttonValue ? 'black' : null}}
                            variant={item.value === buttonValue ? 'contained' : 'outlined'}
                            onClick={()=> handleButtonValue(item.value)}
                        >
                            {item.name}
                        </Button>
                    ))}
                </ButtonGroup>
                <PriceFieldBox
                    sx={{display: buttonValue === 'price' ? 'flex' : 'none'}}
                >
                    <TextField
                        size='small'
                        value={postData.price}
                        onChange={handlePrice}
                        onBlur={handlePriceError}
                        onClick={handlePriceClick}
                        error={priceError}
                        helperText={priceError ? 'Не менее 1 и не более 10 символов' : null}
                        sx={{mr: 1}}
                    />
                    <TextField
                        select
                        size='small'
                        value={currency}
                        onChange={handleCurrencyChange}
                        sx={{minWidth: '80px'}}
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </PriceFieldBox>
                <HaggleBox
                    sx={{display: buttonValue === 'price' ? 'flex' : 'none'}}
                >
                    <Typography
                        variant='subtitle1'
                        sx={{cursor: 'pointer'}}
                    >
                        Торг присутствует
                    </Typography>
                    <Switch
                        checked={postData.haggle}
                        onChange={handleHaggle}
                    />
                </HaggleBox>
                <Typography variant='h6' sx={{marginTop: '32px'}}>Дополнительная информация</Typography>
                <Typography variant='subtitle1' sx={{marginTop: '8px'}}>Частное лицо или бизнес*</Typography>
                <TypeBox>
                    <TypeButton
                        variant='contained'
                        size='small'
                        sx={{background: postData.isBusiness ? 'gray' : '#51c6f0'}}
                        onClick={()=>handleBusiness(false)}
                    >Частное лицо</TypeButton>
                    <TypeButton
                        variant='contained'
                        size='small'
                        sx={{background: postData.isBusiness ? '#51c6f0' : 'gray'}}
                        onClick={()=> handleBusiness(true)}
                    >Бизнес</TypeButton>
                </TypeBox>
                <Typography variant='subtitle1' sx={{marginTop: '16px'}}>Состояние*</Typography>
                <TypeBox>
                    <TypeButton
                        variant='contained'
                        size='small'
                        sx={{background: postData.isNewItem ? '#51c6f0' : 'gray'}}
                        onClick={()=> handleIsNewItem(true)}
                    >Новый</TypeButton>
                    <TypeButton
                        variant='contained'
                        size='small'
                        sx={{background: postData.isNewItem ? 'gray' : '#51c6f0'}}
                        onClick={()=> handleIsNewItem(false)}
                    >Б/У</TypeButton>
                </TypeBox>
                <Typography variant='h6' sx={{marginTop: '32px'}}>Доставка</Typography>
                <DeliverySwitch>
                    <Typography variant='body1'>Отправляю почтой</Typography>
                    <Switch
                        checked={postData.delivery}
                        onChange={handleIsDelivery}
                    />
                </DeliverySwitch>
                <DeliveryBox sx={{display: postData.delivery ? 'flex' : 'none'}}>
                    <FormControl error={error}>
                        <FormLabel sx={{color: '#49524b'}}>Выберите из списка:</FormLabel>
                            <FormGroup sx={{marginTop: '8px'}}>
                                <DeliveryFormControl
                                    control={<Checkbox
                                        checked={UkrPoshta}
                                        onChange={handleChange}
                                        name='UkrPoshta' />}
                                    labelPlacement='start'
                                    label={
                                        <DeliveryTypography variant='body1'>
                                            Укрпошта
                                        </DeliveryTypography>
                                    }
                                />
                                <DeliveryFormControl
                                    control={
                                        <Checkbox
                                            checked={NovaPoshta}
                                            onChange={handleChange}
                                            name='NovaPoshta'
                                        />
                                    }
                                    labelPlacement='start'
                                    label={
                                        <DeliveryTypography variant='body1'>
                                            Нова Пошта
                                        </DeliveryTypography>
                                    }
                                />
                                <DeliveryFormControl
                                    control={
                                        <Checkbox
                                            checked={Justin}
                                            onChange={handleChange}
                                            name='Justin'
                                        />
                                }
                                    labelPlacement='start'
                                    label={
                                        <DeliveryTypography variant='body1'>
                                            Justin
                                        </DeliveryTypography>
                                    }
                                />
                                <DeliveryFormControl
                                    control={
                                    <Checkbox
                                            checked={Meest}
                                            onChange={handleChange}
                                            name='Meest'
                                        />
                                }
                                    labelPlacement='start'
                                    label={<DeliveryTypography variant='body1'>
                                            MeestExpress
                                        </DeliveryTypography>}
                                />
                            </FormGroup>
                        <FormHelperText>
                            Выберите хотя бы одну службу из списка*
                        </FormHelperText>
                    </FormControl>
                </DeliveryBox>
            </InnerBox>
        </MainBox>
    )
}

export default PriceBox
