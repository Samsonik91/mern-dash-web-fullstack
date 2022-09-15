import {Box, Container, Divider, styled, TextField} from "@mui/material"

export const MainContainer = styled(Container)(({theme})=>({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'center',
    margin: 'auto',
    marginTop: '24px',
    marginBottom: '24px',
    [theme.breakpoints.down('md')]:{
        width: '96%'
    },
    [theme.breakpoints.down('sm')]:{
        width: '92%',
        marginTop: '16px',
        marginBottom: '16px'
    }
}))

export const ProfileTop = styled(Box)(({theme})=>({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '4px',
    background: 'white',
    padding: '16px',
    [theme.breakpoints.down('sm')]:{
        flexDirection: 'column',
        marginBottom: '16px'
    }
}))

export const ProfilePart1 = styled(Box)(()=>({
    flex: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px'
}))

export const ProfileDivider = styled(Divider)(({theme})=>({
    display: 'none',
    marginTop: '16px',
    marginBottom: '16px',
    [theme.breakpoints.down('sm')]:{
        display: 'block'
    }
}))

export const ProfilePart2 = styled(Box)(({theme})=>({
    flex: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]:{
        alignItems: 'center',
        gap: '16px'
    }
}))

export const TypographyBox = styled(Box)(()=>({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '8px'
}))

export const SettingItem = styled(Box)(({theme})=>({
    width: '100%',
    background: 'white',
    borderRadius: '4px',
    padding: '16px',
    [theme.breakpoints.down('sm')]:{
        marginBottom: '16px'
    }
}))

export const SettingItemTop = styled(Box)(()=>({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer'
}))

export const SettingItemBottom = styled(Box)(()=>({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '16px',
    paddingTop: '16px',
    paddingBottom: '8px'
}))

export const InnerFieldBox = styled(Box)(()=>({
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '16px'
}))

export const InnerFieldBoxItem = styled(Box)(({theme})=>({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    [theme.breakpoints.down('sm')]:{
        marginBottom: '16px'
    }
}))

export const SettingTextField = styled(TextField)(()=>({
    width: '100%'
}))