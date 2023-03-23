import React, { useEffect, useState } from "react";
import Axios from 'axios';

const Right = ({ crypto_info, from, setTo, to, setResult, result, setImgto, imgto }) => {
    const [isActive, setActive] = useState(false)
    const handleActive = () => {
        setActive(!isActive)
    }
    const handleClick = (e) => {
        const index = e.currentTarget.getAttribute("data-index")
        const value = crypto_info[index]
        setTo(value)
    }
   const crypto_item = crypto_info.map(function (item, index) {
       return (
           <div className="list_item" data-index={index} id={item.name} onClick={handleClick}>
               <div className="icon"> <img src={item.img} alt='icn' /> </div>
               <div id="tickerCrypto" className="crypto_tic">{item.ticker}</div>
               <div className="crypto_name"> {item.name}</div>
           </div>
       )
   })
    return (
        <div className={isActive ? "dropdown_active" : "dropdown"}>
            <div className="dropdown_form">
                <input placeholder="" value={result} disabled/>

                <img src={require('../line.svg').default} alt="line" />
            </div>

            <div className="dropdown_item">
                <div className="active_item">
                    <div className="icon"><img className="genimg" src={to.img}></img></div>
                    <input className="crypto_tic" value={to.ticker} disabled></input>
                </div>
                <button className="drop_button" onClick={handleActive}>
                    <img src={require('../Vector.svg').default} alt="vector" />
                </button>
            </div>
           


            {
                isActive && (
                    <div className="dropdown_menu">
                        <div className="list">
                            {crypto_item}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Right;
