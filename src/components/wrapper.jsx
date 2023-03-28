import React, { useEffect, useState } from 'react';
import './wrapper.css';
import axios from 'axios';
import swap from './swap.svg';
import Left from './left/left';
import Right from './right/right';

const apiKey = process.env.REACT_APP_API_KEY;

function Wrapper({ setErrorMessege }) {
  const [input, setInput] = useState(0.1);
  const [min, setMin] = useState(0);
  const [data, setDate] = useState([]);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState({
    ticker: '',
    image: '',
  });
  const [to, setTo] = useState({
    ticker: '',
    image: '',
  });

  const changeDataInfo = async () => {
    const dataInfo = await axios.get(`https://api.changenow.io/v1/currencies?active=true${apiKey}`);
    setDate(dataInfo.data);
    setFrom(dataInfo.data[0])
    setTo(dataInfo.data[1])
  };

  useEffect(() => {
    changeDataInfo(apiKey);
  }, []);

  const changeResult = async () => {
    if (min > input) {
      setErrorMessege(true);
      return
    }
    setLoading(true);
    try {
      const amountData = await axios.get(`https://api.changenow.io/v1/exchange-amount/${input}/${from.ticker}_${to.ticker}?api_key=${apiKey}`);
      setResult(amountData.data.estimatedAmount);
      setErrorMessege(false);
    } catch {
      setErrorMessege(true);
      setResult('—');
    }
    setLoading(false);
  };

  const changeMin = async () => {
    const minData = await axios.get(`https://api.changenow.io/v1/min-amount/${from.ticker}_${to.ticker}?api_key=${apiKey}`);
    setMin(minData.data.minAmount);
  }

  useEffect(() => {
    changeMin()
  }, [from, to])

  useEffect(() => {
    changeResult();
  }, [from, input, to]);

  const flip = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="wrapper_dropdown">
      <Left
        data={data}
        setResult={setResult}
        api_key={apiKey}
        setFrom={setFrom}
        from={from}
        setInput={setInput}
        input={input}
        min={min}
      />
      <button type="button" className="switch" onClick={loading ? () => { } : flip}>
        <img src={swap} alt="swap" />
      </button>
      <Right
        data={data}
        api_key={apiKey}
        setTo={setTo}
        to={to}
        setResult={setResult}
        result={result}
        from={from}
      />
    </div>
  );
}
export default Wrapper;

