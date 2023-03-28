import React, { useEffect, useRef, useState } from 'react';
import vector from '../Vector.svg';
import vectorOff from '../Vector_off.svg';
import line from '../line.svg';

function Right({
  data, setTo, to, result,
}) {
  const [isActive, setActive] = useState(false);
  const [queryTo, setQueryTo] = useState('');
  const [cryptoItemRight, setCryptoItemRight] = useState();
  const [cryptoList, setCryptoList] = useState([]);

  useEffect(() => {
    setCryptoList(data);
  }, [data]);

  const handleClick = (e) => {
    const index = e.currentTarget.getAttribute('data-index');
    const value = cryptoList[index];
    setTo(value);
    setActive(false);
    setQueryTo('');
  };

  const filterCrypto = () => {
    if (!queryTo) {
      return data;
    }
    const filtered = data.filter((crypto) => crypto.ticker.includes(queryTo.toLowerCase()));
    return filtered;
  };

  useEffect(() => {
    const filteredCrypto = filterCrypto(queryTo);
    setCryptoList(filteredCrypto);
  }, [queryTo]);

  const setCryptoItem2 = () => cryptoList.map((item, index) => (
    <div className="list_item" role="button" data-index={index} key={item.ticker} aria-hidden="true" onClick={handleClick}>
      <div className="icon"><img src={item.image} alt="icn" /></div>
      <div id="tickerCrypto" className="crypto_tic">{item.ticker}</div>
      <div className="crypto_name">{item.name}</div>
    </div>
  ));

  useEffect(() => {
    setCryptoItemRight(setCryptoItem2());
  }, [cryptoList]);

  const listRef = useRef(null);
  const dropRef = useRef(null);

  useEffect(() => {
    const handleClickEvent = (e) => {
      if (!listRef.current) {
        setActive(true);
      }
      if (!dropRef.current.contains(e.target)) {
        setActive(false);
      }
    };
    if (isActive) {
      document.addEventListener('click', handleClickEvent);
    }
    return () => {
      document.removeEventListener('click', handleClickEvent);
    };
  }, [isActive]);

  return (
    <div ref={dropRef} className={isActive ? 'dropdown_active' : 'dropdown'}>
      <div className={isActive ? 'none' : 'dropdown_form '}>
        <input placeholder="" value={result} disabled />
        <img src={line} alt="line" />
      </div>
      <input className={isActive ? 'search' : 'none'} onChange={(e) => setQueryTo(e.target.value)} value={queryTo} placeholder="Search" type="text" />

      <div className="dropdown_item">
        <div className={isActive ? 'none' : 'active_item'}>
          <div className="icon"><img className="genimg" src={to.image} alt="icon " /></div>
          <input className="crypto_tic" value={to.ticker} disabled />
        </div>
        <button type="button" className="drop_button" onClick={() => setActive(!isActive)}>
          <img className={isActive ? 'none' : 'var'} src={vector} alt="vector" />
          <img className={isActive ? 'var_off' : 'none'} src={vectorOff} alt="vector" />
        </button>
      </div>

      {
        isActive && (
          <div ref={listRef} className="dropdown_menu">
            <div className="list">
              {cryptoItemRight}
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Right;
