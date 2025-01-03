import React, { useEffect, useState } from 'react'
import "./Nav.css"

export default function Nav() {
    const [show, setshow] = useState(false);

    useEffect(() => {
      window.addEventListener("scroll",() => {
        if (window.scroll >50) {
            setshow(true)
        } else {
            setshow(false)
        }
      })
    
      return () => {
        window.removeEventListener("scroll", () => {})
      }
    }, [])
    

    return (
        <nav className={`nav ${show && "nav__black"}`}>
            <img 
                alt="Netflix logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png"
                className='nav__logo'
                onClick={() => window.location.reload()} // 새로고침
                />

            {/* 구현필요
            <input /> */}

            <img 
                alt="User logged"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
                className='nav__avatar'
                />
            
        </nav>
    )
}
