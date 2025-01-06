import React from 'react'
import Banner from './Banner'
import requests from '../api/request'
import Row from './Row'

export default function MainPage() {
  return (
    <div>
        <Banner/>
        <Rows/>
    </div>
  )
}
function Rows(){
    return (
        <div>
                    <Row
        title = "NETFLIX ORIGINALS"
        id = "NO"
        fetchUrl={requests.fetchNetfilxOriginals} //requests객체에서 가져옴
        isLargeRow  // 큰 포스터
        />

        <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending}/>
        <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated}/>
        <Row title="Action Movies" id="AM" fetchUrl={requests.fetchActionMovies}/>
        <Row title="Comedy Movies" id="CM" fetchUrl={requests.fetchComedyMovies}/>
        </div>
    )
}
