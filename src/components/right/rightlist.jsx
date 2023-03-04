import React, { useEffect, useState } from "react";
import Axios from 'axios';

const CryptoRight = ({ from, setTo, setImgto, api_key }) => {
    const handleClick = function (e) {
        let index = e.currentTarget.getAttribute("data-index")
        let valueTicker = crypto_item[index].props.children[1].props.children
        let valueImg = crypto_item[index].props.children[0].props.children[1].props.src
        setTo(valueTicker)
        setImgto(valueImg)
    }


    const [dataTo, setDataTo] = useState([])
    useEffect((api_key) => {
        Axios.get(`https://api.changenow.io/v1/currencies-to/${from}`)
            .then((data) => {
                setDataTo(data.data)
                console.log(data)
            })
    }, []);


    const crypto_item = dataTo.map(function (item, index) {
        return (
            <div className="list_item" data-index={index} onClick={handleClick}>
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

export default CryptoRight;
