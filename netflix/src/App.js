import './App.css';
import Nav from './components/Nav'
import Banner from './components/Banner'
import Row from './components/Row'
import Footer from './components/Footer'
import requests from './api/request'

function App() {
  
   return <div className="App">
    <Nav />
    <Banner />

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

    <Footer />
   </div>
}

export default App;
