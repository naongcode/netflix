import axios from '../api/axios';
import React, {useEffect, useState} from 'react'
import "./Row.css"
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


// <Row />에 들어있는 props(속성)를 가져옴
// 영화정보 가져올 함수 실행 fetchMovieData()
export default function Row({ islargeRow, title, id, fetchUrl}) {
  const [movies, setMovies] = useState([]);

  // fetchUrl이 변할때만 실행
  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl])
  
  const fetchMovieData = async () => {
    // axios.get(url주소) -> baseURL과 결합된다.
    const request = await axios.get(fetchUrl);
    console.log('request',request);

    // request로 보낸 data.results 정보를 가져옴
    setMovies(request.data.results)
  }
  
  return (
    <section className='row'>
      <h2>{title}</h2>
      <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      breakpoints={{
        1378: {
          slidesPerView: 6,
          slidesPerGruop: 6,
        },
        998: {
          slidesPerView: 5,
          slidesPerGroup: 5, 
        },
        625: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
        0: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        }
      }}
    >
      
        <div id={id} className='row__posters'>
          {/* 영화나열하기 정보는 movies에 들어있음*/}
          {movies.map((movie) => (
            <SwiperSlide>
            <img 
              key={movie.id}
              className={`row__poster ${islargeRow && "row__posterLarge"}`}
              // isLargeRow가 적용되어 있으면 poster_path(큰거)아니면 backdrop_path(작은거)
              src={`https://image.tmdb.org/t/p/original/${islargeRow ? movie.poster_path : movie.backdrop_path}`}
              loading="lazy"
              alt={movie.name}
              />
              </SwiperSlide>
          ))}
        </div>
    </Swiper>
        

      
    </section>
  )
} 
