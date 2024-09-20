"use client"
import { useEffect } from 'react';
import RecommendItem from './RecommendItem';
import { useDispatch, useSelector } from 'react-redux';
import { actionMedia } from '~/redux/reducers/mediaReducer';

function Recommend() {
    const dispatch = useDispatch()
    const { movieList, paginationMovieList } = useSelector(state => state.mediaState)

    useEffect(() => {
        if(movieList && movieList.length <= 0) {
            dispatch(actionMedia.processFetchMovieList(paginationMovieList))
        }
    }, [movieList])

    return (
        <div
            className="flex flex-col space-y-2"
        >
            {
                movieList && movieList.length > 0 
                && movieList.map((movie, index) => {
                    return <RecommendItem 
                        key={movie.ID || index}
                        data={movie}
                        // onClick={() => {
                        //     handleRedirect(movie.ID)
                        // }}
                    />
                })
            }
        </div>
    );
}

export default Recommend;