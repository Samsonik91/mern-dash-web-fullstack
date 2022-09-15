import React, {useState} from 'react'
import {
    MenuInnerBox,
    MenuItemSearchIcon,
    SearchButton,
    SearchIconButton,
    StyledMenuItem
} from "./styledComponent"
import {Box, InputBase, Menu} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

const SearchMenu = ({handleSearchValue, searchByTags, search}) => {

    const [anchorEl, setAnchorEl] = useState(null)

    const handleOpenMenu = e => setAnchorEl(e.currentTarget)
    const handleCloseMenu = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(e.currentTarget.classList.contains('search-input') && !e.currentTarget.classList.contains('search-button')){
            return false
        }else{
            setAnchorEl(null)
        }
    }

    window.addEventListener('resize', handleCloseMenu)

    const handleSearch = (e) => {
        handleCloseMenu(e)
        searchByTags()
    }

    return (
        <Box aria-controls='search-menu'>
            <SearchIconButton
                title='Поиск на сайте'
                onClick={handleOpenMenu}
            >
                <SearchIcon fontSize='large'/>
            </SearchIconButton>
            <Menu
                id='search-menu'
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                className='search-input'
                onClose={handleCloseMenu}
            >
                <StyledMenuItem>
                    <MenuInnerBox>
                        <MenuItemSearchIcon/>
                        <InputBase
                            placeholder='Поиск на сайте'
                            sx={{paddingLeft: '32px'}}
                            onChange={handleSearchValue}
                            value={search}
                        />
                        <SearchButton
                            onClick={handleSearch}
                            className='search-button'
                        >Найти</SearchButton>
                    </MenuInnerBox>
                </StyledMenuItem>
            </Menu>
        </Box>
    )
}

export default SearchMenu