import Swal from "sweetalert2"


const swallPrompt = (setIsPrompt, setIsPromptAuth, navigation, func, nav) => {

    const swall = Swal.fire({
        title: 'Вы уверены что хотите покинуть страницу ?',
        text: 'Введённые вами данные не будут сохранены.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Покинуть страницу',
        cancelButtonText: 'Остатся на странице',
        reverseButtons: true
    })
        .then((result)=>{
            if(result.isConfirmed){
                if(func) func()
                setIsPrompt(false)
                setIsPromptAuth(false)
                if(localStorage.getItem('adForm')) localStorage.removeItem('adForm')
                if(localStorage.getItem('authData')) localStorage.removeItem('authData')
                if(localStorage.getItem('rightDesc')) localStorage.removeItem('rightDesc')
                if(nav && navigation) navigation(nav)
            }else{
                return
            }
        })
    return swall
}

export const popStatePrompt = (setPrompt, navigation, func, nav, data, typeForm) => {
    if(typeForm === 'auth') localStorage.setItem('authData', JSON.stringify(data))
    let result = window.confirm('Вы уверены что хотите покинуть страницу ? Введённые вами данные не будут сохранены.')
    if(result) {
        if(func !== null) func()
        setPrompt(false)
        if(localStorage.getItem('adForm')) localStorage.removeItem('adForm')
        if(localStorage.getItem('authData')) localStorage.removeItem('authData')
        if(localStorage.getItem('rightDesc')) localStorage.removeItem('rightDesc')
    }else{
        setPrompt(true)
        navigation(nav)
    }
}

export default swallPrompt