import React, {useState} from 'react'
import {Box, Typography} from "@mui/material"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"
import {DeleteBox, InputBox, MainBox, PhotoBoxField, PhotoDeleteIcon, PhotosBox} from "./styledComponents"


const PhotoBox = ({postData, setPostData, isPrompt, setIsPrompt}) => {

    const containers = [1,1,1,1,1,1]
    const [currentIndex, setCurrentIndex] = useState(null)

    const fileSelectedHandler = e => {
        const reader = new FileReader()
        const file = e.target.files[0]

        if(file && file.type.substring(0, 5) === 'image'){
            reader.onload = () =>{
                if(reader.readyState === 2){
                    setPostData({...postData, files: [...postData.files, reader.result]})
                    if(!isPrompt) setIsPrompt(true)
                }
            }
            reader.readAsDataURL(file)
        }else{
            return false
        }
    }

    const removeFile = (num) => {
        const newFiles = postData.files.filter((item, i)=> i !== num)
        setPostData({...postData, files: newFiles})
    }

    const dragStartHandler = (e, index) => {
        setCurrentIndex(index)
    }

    const dragOverHandler = (e) => {
        e.preventDefault()
    }

    const onDragEnterHandler = (e) => {
        for(let i=0; i<postData.files.length; i++){
            if(e.target.parentNode.getAttribute('data-id') === postData.files[i]){
                e.target.parentNode.style.border = '3px solid darkblue'
            }
        }
    }

    const dragEndHandler = (e) => {
        for(let i=0; i<postData.files.length; i++){
            if(e.target.parentNode.getAttribute('data-id') === postData.files[i]){
                e.target.parentNode.style.border = '1px solid black'
            }
        }
    }

    const dropHandler = (e, index) => {
        e.preventDefault()
        for(let i=0; i<postData.files.length; i++){
            if(e.target.parentNode.getAttribute('data-id') === postData.files[i]){
                e.target.parentNode.style.border = '1px solid black'
            }
        }

        let newFiles = [...postData.files]

        newFiles.map((_, i)=> {
                if (i === index) {
                    let temp = postData.files[index]
                    newFiles[index] = newFiles[currentIndex]
                    newFiles[currentIndex] = temp
                }
            }
        )
        setPostData({...postData, files: newFiles})
    }

    const imageBox = () => {
        let content = []
        for(let i=0; i<containers.length; i++){
            if(postData.files[i]) {
                content.push(
                            <PhotoBoxField
                                draggable={true}
                                key={i}
                                data-id={postData.files[i]}
                                sx={{backgroundImage: `url(${postData.files[i]})`, backgroundSize: 'contain'}}
                                onDragStart={(e)=> dragStartHandler(e, i)}
                                onDragEnter={(e)=> onDragEnterHandler(e)}
                                onDragEnd={(e)=> dragEndHandler(e)}
                                onDragLeave={(e)=> dragEndHandler(e)}
                                onDragOver={(e)=> dragOverHandler(e)}
                                onDrop={(e)=> dropHandler(e, i)}
                            >
                                <DeleteBox>
                                    <Box title='Удалить фото'
                                         onClick={()=> removeFile(i)}
                                    >
                                        <PhotoDeleteIcon/>
                                    </Box>
                                </DeleteBox>
                            </PhotoBoxField>
                )
            }else{
                content.push(
                    <InputBox
                        key={i}
                        component='label'
                        title='Нажмите чтобы добавить фото'
                    >
                        <input
                            type='file'
                            accept='image/*'
                            style={{ display: 'none'}}
                            onChange={fileSelectedHandler}
                        />
                        <AddAPhotoIcon color='action' fontSize='large'/>
                    </InputBox>
                )
            }
        }
        return content
    }

    return (
        <MainBox>
            <Typography variant='h6'>
                Добавить фотографии
            </Typography>
            <PhotosBox maxWidth='sm'>
                {imageBox()}
            </PhotosBox>
        </MainBox>
    )
}

export default PhotoBox