import React, { useEffect, useState } from "react";
import Axios from 'axios';

const CryptoLeft = ({ setFrom, setImg, api_key }) => {
    const handleClick = function (e) {
        let index = e.currentTarget.getAttribute("data-index")
        let valueTicker = crypto_item[index].props.children[1].props.children
        let valueImg = crypto_item[index].props.children[0].props.children[1].props.src
        setFrom(valueTicker)
        setImg(valueImg)
    }

    const [dataFrom, setDateFrom] = useState([])
    useEffect((api_key) => {
        Axios.get(`https://api.changenow.io/v1/currencies?active=true${api_key}`)
            .then((data) => {
                setDateFrom(data.data)
            })
    }, []);

    const crypto_item = dataFrom.map(function (item, index) {
        return (
            <div data-index={index} className="list_item" onClick={handleClick}>
                <div className="icon"> <img src={item.image} alt='icn' /> </div>
                <div id="tickerCrypto" className="crypto_tic">{item.ticker}</div>
                <div className="crypto_name"> {item.name}</div>
            </div>
        )
    })

    return (
        <div className="list">
            {crypto_item}
        </div>
    )
}

export default CryptoLeft;