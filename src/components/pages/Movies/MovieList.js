"use client"
import { useRouter } from 'next/navigation';
import MovideItem from './MovideItem';
import MovieSkeleton from './MovieSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import { actionMedia } from '~/redux/reducers/mediaReducer';

function MovieList() {
    const router = useRouter()
    const dispatch = useDispatch()
    const observerRef = useRef(null); // Ref để theo dõi element "loading"

    const { isFetchMediaMovieList, paginationMovieList, movieList } = useSelector(state => state.mediaState)

    const fetchMovieList = () => {
        dispatch(actionMedia.setValuePaginationMovieList({
            key: 'page',
            value: paginationMovieList.page + 1,
        }))

        dispatch(actionMedia.processFetchMovieList(paginationMovieList))
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && !paginationMovieList.isLastPage && !isFetchMediaMovieList) {
                fetchMovieList(); // Gọi fetchData khi phần tử loading xuất hiện trong viewport
            }
          },
          { 
            threshold: 0.1 
          } // Phần tử phải hoàn toàn trong viewport mới trigger
        );
    
        if (observerRef.current) {
          observer.observe(observerRef.current); // Theo dõi phần tử ref "loading"
        }
    
        return () => {
          if (observerRef.current) {
            observer.unobserve(observerRef.current); // Bỏ theo dõi khi component bị huỷ
          }
        };

      }, [paginationMovieList, observerRef, isFetchMediaMovieList]); // Cập nhật khi `hasMore` thay đổi


    const handleRedirect = (movieID) => {
        localStorage.setItem('hasPlayed', true);
        router.push(`/watch?m=${movieID}`)
    }

    return (
        <>
            <div
                className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            >
                {
                    !isFetchMediaMovieList && movieList && movieList.length > 0 
                    && movieList.map((movie, index) => {
                        return <MovideItem 
                            key={movie.ID || index}
                            data={movie}
                            onClick={() => {
                                handleRedirect(movie.ID)
                            }}
                        />
                    })
                }
            </div>
            {
                !paginationMovieList.isLastPage && <div 
                    className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4"
                    ref={observerRef}
                >
                    <MovieSkeleton />
                </div>
            }
        </>
    );
}

export default MovieList;