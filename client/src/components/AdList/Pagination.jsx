import React, {useEffect} from 'react'
import {Link} from "react-router-dom"
import {Pagination, PaginationItem} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {GetAdsByTags} from "../../thunks/ad"

const Paginate = ({tags, page, search}) => {

    const { numberOfPages } = useSelector(({posts}) => posts.ads ? posts.ads.data : null)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(search) dispatch(GetAdsByTags(tags, page))
    },[tags, page])

    return (
        <Pagination
            count={numberOfPages || 10}
            siblingCount={0}
            boundaryCount={1}
            size='large'
            page={Number(page) || 1}
            variant="outlined"
            color="secondary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`adList/search?tags=${tags}&page=${item.page}`} />
            )}
        />
    )
}

export default Paginate