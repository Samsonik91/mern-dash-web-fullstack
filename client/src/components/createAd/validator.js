import {cities} from './data'

const validator = (postData,
                   setNameError,
                   setCatError,
                   setDescError,
                   setLocError,
                   setFaceError,
                   setPriceError,
                   setPhoneError) => {
    const nameLength = postData.name.length
    const descLength = postData.description.length
    const location = postData.location
    let locCount = 0
    const faceLength = postData.contactFace.length
    const postLength = postData.postServices.length
    const priceLength = postData.price.length
    const phoneLength = postData.phone.length
    const numbers = ['0','1','2','3','4','5','6','7','8','9']

    let nameError, catError, descError, locError, faceError, priceError, postError, phoneError = false

    if(nameLength < 10 || nameLength > 70){
        setNameError(true)
        nameError = true
    }

    if(postData.category === ''){
        setCatError(true)
        catError = true
    }

    if(descLength < 50 || descLength > 3000){
        setDescError(true)
        descError = true
    }

    for(let i=0; i<cities.length; i++){
        if(location.split(',')[0] === cities[i].name) locCount = locCount + 1
    }

    if(locCount === 0){
        setLocError(true)
        locError = true
    }

    if(faceLength < 2 || faceLength > 100){
        setFaceError(true)
        faceError = true
    }

    if(postData.typeDeal === 'price'){
        if(priceLength < 1 || priceLength > 10){
            setPriceError(true)
            priceError = true
        }
    }

    if(postData.delivery === true && postLength < 1){
        postError = true
    }

    if(phoneLength !== 10) {
        setPhoneError(true)
        phoneError = true
    }

    for(let i=0; i<phoneLength; i++){
        if(!numbers.includes(postData.phone[i])){
            setPhoneError(true)
            phoneError = true
        }
    }

    if(nameError || catError || descError || locError || faceError || priceError || postError || phoneError){
        return true
    }else{
        return false
    }
}

export default validator
