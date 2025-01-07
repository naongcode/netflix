import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import requests from "../api/request";
import "./Banner.css";
import styled from "styled-components";

export default function Banner() {
    const [movie, setMovie] = useState(null); // 기본값 null
    const [isClicked, setIsClicked] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = async () => {
        try {
            // 영화 목록 가져오기
            const request = await axios.get(requests.fetchNowPlaying);
            const movieId =
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length)
                ].id;

            // 아이디에 따른 영화 세부 정보 가져오기
            const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
                params: { append_to_response: "videos" },
            });

            setMovie(movieDetail); // 성공적으로 데이터 설정
            setIsError(false); // 에러 상태 해제
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setIsError(true); // 에러 발생 상태 설정
        }
    };

    useEffect(() => {
        fetchData(); // 초기 데이터 요청

        // 에러 상태일 경우 3초마다 재시도
        const retryInterval = setInterval(() => {
            console.log("error")
            if (isError) {
                fetchData();
            }
        }, 3000);

        return () => clearInterval(retryInterval); // 컴포넌트 언마운트 시 인터벌 제거
    }, [isError]);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    if (!movie) {
        // 데이터 로드 중 또는 에러 상태
        return (
            <header className="banner">
                <div className="banner__contents">
                    <h1 className="banner__title">Loading video...</h1>
                </div>
            </header>
        );
    }

    if (!isClicked) {
        // 기본 화면
        return (
            <header
                className="banner"
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                }}
            >
                <div className="banner__contents">
                    <h1 className="banner__title">
                        {movie.title || movie.name || movie.original_name || ""}
                    </h1>

                    <div className="banner__buttons">
                        <button
                            className="banner__button play"
                            onClick={() => setIsClicked(true)}
                        >
                            Play
                        </button>
                        <button className="banner__button info">More Information</button>
                    </div>

                    <h1 className="banner__description">
                        {truncate(movie.overview, 100)}
                    </h1>
                </div>
                <div className="banner--fadeBottom" />
            </header>
        );
    }

    // 동영상 화면
    return (
        <Container>
            <HomeContainer>
                <Iframe
                    width="640"
                    height="360"
                    src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0]?.key}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="autoplay; fullscreen"
                    allowfullscreen
                ></Iframe>
            </HomeContainer>
        </Container>
    );
}

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`;
