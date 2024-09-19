import CardBlur from '~/components/ui/CardBlur';
import MovideItem from './MovideItem';

function MovieList() {
    return (
        <div
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
        >
            <MovideItem />
            <MovideItem />
            <MovideItem />
            <MovideItem />
            <MovideItem />
            <MovideItem />
        </div>
    );
}

export default MovieList;