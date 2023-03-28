import React, { useEffect, useRef, useState } from 'react';
import vector from '../Vector.svg';
import vectorOff from '../Vector_off.svg';
import line from '../line.svg';

function Left({
  data, setFrom, setResult, from, setInput, input, min,
}) {
  const [isOpen, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [cryptoItem, setCryptoItem] = useState();
  const [cryptoList, setCryptoList] = useState([]);

  const cryptoInfo = data.map((item) => ({
    ticker: `${item.ticker}`,
    name: `${item.name}`,
    img: `${item.image}`,
  }));

  useEffect(() => {
    setCryptoList(cryptoInfo);
  }, [data]);

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (parseFloat(e.target.value) < min) {
      setResult('—');
      setError(true);
    } else {
      setError(false);
    }
  };
  const handleClick = (e) => {
    const index = e.currentTarget.getAttribute('data-index');
    const value = cryptoList[index];
    setFrom(value);
    setOpen(false);
    setQuery('');
  };
  const filterCryptoLeft = () => {
    if (!query) {
      return (cryptoInfo);
    }
    const filtered = cryptoInfo.filter((crypto) => crypto.ticker.includes(query.toLowerCase()));
    return (
      filtered
    );
  };
  useEffect(() => {
    const filteredCryptoLeft = filterCryptoLeft(query);
    setCryptoList(filteredCryptoLeft);
  }, [query]);

  const setCryptoItemLeft = () => cryptoList.map((item, index) => (
    <div aria-hidden="true" className="list_item" key={item.ticker} data-index={index} onClick={handleClick}>
      <div className="icon"><img src={item.img} alt="icn" /></div>
      <div id="tickerCrypto" className="crypto_tic">{item.ticker}</div>
      <div className="crypto_name">{item.name}</div>
    </div>
  ));

  useEffect(() => {
    setCryptoItem(setCryptoItemLeft());
  }, [cryptoList]);

  const listRef = useRef(null);
  const dropRef = useRef(null);

  useEffect(() => {
    const handleClickEvent = (e) => {
      if (!listRef.current) {
        setOpen(true);
      }
      if (!dropRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('click', handleClickEvent);
    }
    return () => {
      document.removeEventListener('click', handleClickEvent);
    };
  }, [isOpen]);

  return (

    <div ref={dropRef} className={isOpen ? 'dropdown_active' : 'dropdown'}>

      <div className={error ? 'error' : 'none'}>
        {' '}
        Min amount
        {min}
      </div>

      <div className={isOpen ? 'none' : 'dropdown_form '}>
        <input onChange={(e) => inputHandler(e)} name="input_name" value={input} />
        <img src={line} alt="line" />
      </div>
      <input className={isOpen ? 'search' : 'none'} onChange={(e) => setQuery(e.target.value)} value={query} placeholder="Search" type="text" />

      <div className="dropdown_item">
        <div className={isOpen ? 'none' : 'active_item'}>
          <div className="icon"><img src={from.img} alt="icon" /></div>
          <input className="crypto_tic" value={from.ticker} disabled />
        </div>
        <button type="button" className="drop_button" onClick={() => setOpen(!isOpen)}>
          <img className={isOpen ? 'none' : 'var'} src={vector} alt="vector" />
          <img className={isOpen ? 'var_off' : 'none'} src={vectorOff} alt="vector" />
        </button>

      </div>
      {
                isOpen && (
                <div ref={listRef} className="dropdown_menu">
                  <div className="list">
                    {cryptoItem}
                  </div>
                </div>
                )
            }

    </div>
  );
}

export default Left;
