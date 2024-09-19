"use client"
import { useRouter } from 'next/navigation';
import MovideItem from './MovideItem';

function MovieList() {
    const router = useRouter()

    const handleRedirect = () => {
        localStorage.setItem('hasPlayed', true);
        router.push(`/watch?m=testing`)
    }

    return (
        <div
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
            <MovideItem 
                onClick={() => handleRedirect()}
            />
            <MovideItem />
            <MovideItem />
            <MovideItem />
            <MovideItem />
            <MovideItem />
        </div>
    );
}

export default MovieList;