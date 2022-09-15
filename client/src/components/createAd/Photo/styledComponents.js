import {Box, styled} from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

export const MainBox = styled(Box)(({theme})=>({
    background: 'white',
    padding: '16px',
    paddingLeft: '32px',
    paddingRight: '32px',
    marginBottom: '16px',
    borderRadius: '8px'
}))

export const PhotosBox = styled(Box)(({theme})=>({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'start',
    gap: '8px',
    marginTop: '16px',
    marginBottom: '16px'
}))

export const DeleteBox = styled(Box)(()=>({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    opacity: 0,
    position: 'absolute',
    zIndex: 3,
    '&:hover': {
        opacity: 1
    }
}))

export const PhotoBoxField = styled(Box)(()=>({
    position: 'relative',
    width: '150px',
    height: '150px',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundSize: 'cover',
    border: '1px solid black',
    '&:hover': {
        '&:after': {
            content: `""`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'gray',
            opacity: 0.5,
            zIndex: 2
        }
    }
}))

export const PhotoDeleteIcon = styled(DeleteForeverIcon)(()=>({
    fontSize: '48px',
    color: 'black',
    background: 'white',
    borderRadius: '100%'
}))

export const InputBox = styled(Box)(()=>({
    width: '150px',
    height: '150px',
    border: '1px solid black',
    background: '#d8dce3',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
}))