import {Box, styled} from "@mui/material"

export const MainBox = styled(Box)(()=>({
    cursor: 'pointer',
    display: 'flex'
}))

export const ProfileBox = styled(Box)(()=>({
    color: 'white',
    display: 'flex',
    alignItems: 'center'
}))

export const UnreadBox = styled(Box)(()=>({
    width: '26px',
    height: '26px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    position: 'absolute',
    background: 'yellow',
    bottom: '28px',
    left: '28px',
    fontSize: '18px',
    fontWeight: '600'
}))