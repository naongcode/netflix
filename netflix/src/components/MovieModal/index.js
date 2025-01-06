import React, { useEffect, useState, useRef } from 'react'
import './MovieModal.css'
import useOnClickOutside from '../hooks/useOnClickOutside';

function MovieModal({
    backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    vote_average,
    setModalOpen,
    movieId,
}) {
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=93da99847bf7cc833a60063441ad2740`
                  );

                // console.log('movieid:',movieId)

                const data = await response.json();
                const trailer = data.results.find((video) => video.site === "YouTube" && video.type === "Trailer");
                setTrailerKey(trailer?.key || null);
            } catch(error) {
                console.log(error);
            }
        }

        fetchTrailer();
    }, [movieId])

    const ref = useRef();
    useOnClickOutside(ref, ()=>{setModalOpen(false)})

  return (
    <div className='presentation' role="presentation">
        <div className="wrapper-modal" >
        {/* onClick={(e) => {e.stopPropagation()}} */}
            <div className="modal" ref={ref}>
                <span onClick={() => setModalOpen(false)} className="modal-close">
                    X
                </span>
                <img className='modal_poster-img' src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} alt="modal_poster-img" />
                <div className="modal_content">
                    <p className="modal_details">
                        <span className="modal_user-perc">
                            100% for you
                        </span>{ " " }
                        {release_date ? release_date : first_air_date}
                    </p>
                    <h2 className="modal_title">{title ? title : name }</h2>
                    <p className="modal_overview">평점 : {vote_average}</p>
                    <p className="modal_overview">{overview}</p>

                    {
                        trailerKey ? (<iframe
                            className="modal_trailer"
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="movie trailer"
                          ></iframe>) : (<p className="modal_no-trailer">트레일러가 없습니다.</p>) 
                    }

                </div>
            </div>
        </div>
    </div>
  )
}

export default MovieModal;