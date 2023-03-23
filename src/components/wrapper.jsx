import React, { useEffect, useState } from "react";
import "./wrapper.css"
import Axios from 'axios';
import Left from "./left/left";
import Right from "./right/right";

const api_key = process.env.REACT_APP_API_KEY

const Wrapper = ({setErrorMessege}) => {
    const [input, setInput] = useState(0.1);
    const [min, setMin] = useState(0);
    const [data, setDate] = useState([])
    const [result, setResult] = useState([])
    const [from, setFrom] = useState({
        ticker: "btc",
        img: "https://content-api.changenow.io/uploads/btc_d8db07f87d.svg",
    })
    const [to, setTo] = useState({
        ticker: "eth",
        img: "https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg",
    });
    const changeDataInfo = async (api_key) => {
        const dataInfo = await Axios.get(`https://api.changenow.io/v1/currencies?active=true${api_key}`)
        setDate(dataInfo.data)
    }
    useEffect((api_key) => {
        changeDataInfo(api_key)
    }, []);
  
    const changeResult = async () => {
        try {
            const minData = await Axios.get(`https://api.changenow.io/v1/min-amount/${from.ticker}_${to.ticker}?api_key=${api_key}`)
            setMin(minData.data.minAmount)
            const amountData = await Axios.get(`https://api.changenow.io/v1/exchange-amount/${input}/${from.ticker}_${to.ticker}?api_key=${api_key}`)
            setResult(amountData.data.estimatedAmount)
            setErrorMessege(false)
        } catch {
            setErrorMessege(true)
            setResult("—")
        }   
    
    }
    useEffect(() => {
        changeResult()
    }, [from, input, to])

   
    const crypto_info = data.map((item)=> {
        return  {
                ticker:`${item.ticker}`,
                name: `${item.name}`,
                img: `${item.image}`}
        
    })
    
    
    const flip = () => {
        setFrom(to);
        setTo(from);
        setImg(imgto)
        setImgto(img)
    }
    

    return (
        <div className="wrapper_dropdown">
            <Left data={data} crypto_info={crypto_info} setResult={setResult} api_key={api_key} setFrom={setFrom} from={from} setInput={setInput} input={input} min={min} />
            <div className="switch" onClick={flip}>
                <img src={require('./swap.svg').default} alt="swap" />
            </div>
            <Right  crypto_info={crypto_info} api_key={api_key} setTo={setTo} to={to} setResult={setResult} result={result}from={from}  />
        </div>
    )
}
export default Wrapper;
