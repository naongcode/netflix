import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "./Nav.css"

export default function Nav() {
    const [show, setshow] = useState(false);
    const [searchValue, setsearchValue] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      window.addEventListener("scroll",() => {
        if (window.scrollY >50) {
            setshow(true)
        } else {
            setshow(false)
        }
      })
    
      return () => {
        window.removeEventListener("scroll", () => {})
      }
    }, [])
    function handleChange(e) {
      setsearchValue(e.target.value);
      navigate(`/search?q=${e.target.value}`);
    }
    

    return (
        <nav className={`nav ${show && "nav__black"}`}>
            <img 
                alt="Netflix logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png"
                className='nav__logo'
                onClick={() => (window.location.href = "/netflix")} // 홈으로 이동
                />
                <input className='nav__input'
                value={searchValue}
                onChange={handleChange}
                type="text"
                placeholder='영화를 검색해주세요.'></input>
            <img 
                alt="User logged"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
                className='nav__avatar'
                />
        </nav>
    )
}
