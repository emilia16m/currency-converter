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
    ticker: 'btc',
    img: 'https://content-api.changenow.io/uploads/btc_d8db07f87d.svg',
  });
  const [to, setTo] = useState({
    ticker: 'eth',
    img: 'https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg',
  });
  const changeDataInfo = async () => {
    const dataInfo = await axios.get(`https://api.changenow.io/v1/currencies?active=true${apiKey}`);
    setDate(dataInfo.data);
  };
  useEffect(() => {
    changeDataInfo(apiKey);
  }, []);

  const changeResult = async () => {
    setLoading(true);
    try {
      const minData = await axios.get(`https://api.changenow.io/v1/min-amount/${from.ticker}_${to.ticker}?api_key=${apiKey}`);
      setMin(minData.data.minAmount);
      const amountData = await axios.get(`https://api.changenow.io/v1/exchange-amount/${input}/${from.ticker}_${to.ticker}?api_key=${apiKey}`);
      setResult(amountData.data.estimatedAmount);
      setErrorMessege(false);
    } catch {
      setErrorMessege(true);
      setResult('—');
    }
    setLoading(false);
  };

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

// Wrapper.propTypes = {
//   setErrorMessege: propsTypes .string.isRequired,
// };
