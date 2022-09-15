import React, {useEffect, useState} from 'react'
import {Typography} from "@mui/material"
import {DescriptionField, MainBox} from "./styledComponents"


const DescriptionBox = ({descError, postData, setPostData, setDescError, isPrompt, setIsPrompt}) => {

    const [descCount, setDescCount] = useState(3000)
    const [descHelperText, setDescHelperText] = useState(false)
    let rightDesc = JSON.parse(localStorage.getItem('rightDesc'))

    if(rightDesc){
        rightDesc = rightDesc.replace('<br/>', '/\r\n/g')
        rightDesc = rightDesc.replace('<br/>', '/\n/g')
    }

    const handleDescription = (e) => {
        let val = e.target.value

        setPostData({...postData, description: val})
        if(!isPrompt) setIsPrompt(true)
        setDescHelperText(true)
        if(3000 - val.length  < 0) {
            return false
        }
        setDescCount(3000 - val.length)
    }

    const cleanDescHelperText = () => {
        if(!descError && postData.description.length > 49){
            setDescHelperText(false)
            setDescError(false)
        }else{
            setDescHelperText(true)
            setDescError(true)
        }
    }

    useEffect(()=>{
        if(postData.description.length > 0){
            if(postData.description.length < 50 || postData.description.length > 3000){
                setDescError(true)
            }else{
                setDescError(false)
            }
        }
    },[postData])

    return (
        <MainBox>
            <Typography variant='h6'>
                Описание
            </Typography>
            <DescriptionField
                multiline
                value={rightDesc ? rightDesc : postData.description}
                error={descError}
                label={descError ? 'Не менее 50 и не более 3000 символов' : null}
                rows={10}
                fullWidth
                onChange={handleDescription}
                onBlur={cleanDescHelperText}
                helperText={descHelperText && `Осталось ${descCount} символов`}
                placeholder='Создайте подробное описание объявления, чтобы ваш потенциальный клиент имел более детальную информацию о вашем товаре или услуге.'
            />
        </MainBox>
    )
}

export default DescriptionBox