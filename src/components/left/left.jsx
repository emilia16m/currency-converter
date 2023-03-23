import React, { useEffect, useState } from "react";
import Axios from 'axios';

const Left = ({  data, crypto_info, setFrom, setResult, from, setInput, input, min }) => {
    const [isOpen, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const handleOpen = () => {
        setOpen(!isOpen);
    }

    const inputHandler = (e) => {
        setInput(e.target.value)
        if (parseFloat(e.target.value) < min) {
            setResult(`—`)
            setError(true)
        } else {
            setError(false)
        }
    }

        const [query, setQuery] = useState("")
        const [cryptoList, setCryptoList] = useState([])

        useEffect(() => {
            setCryptoList(crypto_info)
        }, [data])
        console.log(cryptoList)

        const filterCrypto = (query) => {
        if (!query) {
          return (crypto_info);
        } else {
            console.log("2")
            const filtered = crypto_info.filter(crypto => crypto.ticker.includes(query)) 
            return (
                filtered
            );
        }
}
        useEffect(() => {
            const filteredCrypto = filterCrypto(query);
            setCryptoList(filteredCrypto);
            //   console.log(cryptoList)
        }, [query]);

    
        const handleClick = (e) => {
            const index = e.currentTarget.getAttribute("data-index")
            const value = cryptoList[index]
            setFrom(value)
        }
        const [crypto_item, setCryptoItem] = useState()

        useEffect(() => {
            console.log('im here');
            setCryptoItem(setCryptoItem2())
        }, [cryptoList]);


        const setCryptoItem2 = () => cryptoList.map(function (item, index) {
            return (
                <div className="list_item" key={item.ticker} data-index={index} onClick={handleClick}>
                    <div className="icon"> <img src={item.img} alt='icn' /> </div>
                    <div id="tickerCrypto" className="crypto_tic">{item.ticker}</div>
                    <div className="crypto_name"> {item.name}</div>
                </div>
            )
        })

        

   
    
      
    

    //   const handleClick = (e) => {
   



     // const [ crypto, setCrypto ] = useState() 
    // const [ query, setQuery] = useState("") 

    // function renderCrypto(query) { 
    //     const filtered = crypto_info.filter(crypto => crypto.ticker.includes(query)) 
    //     if (!query) {
    //         return(crypto_item)
    //     }
    //     return filtered.map(function (item, index) {     
    //         return ( 
    //             <div className="list_item" key={index} data-index={index} onClick={handleClick}> 
    //                 <div className="icon"> <img src={item.img} alt='icn' /> </div> 
    //                 <div className="crypto_tic">{item.ticker}</div> 
    //                 <div className="crypto_name" > {item.name}</div>     
    //             </div> 
    //         ) 
    //     }) 
    //   } 




    
    return (

        <div className={isOpen ? "dropdown_active" : "dropdown"} >

            <div className={error ? 'error' : 'none'}> Min amount {min}</div>

            <div className="dropdown_form">
                <input onChange={e => inputHandler(e)} name="input_name" value={input} />
                <img src={require('../line.svg').default} alt="line" />
            </div>

            <div className="dropdown_item">
                <div className="active_item" >
                <div className="icon"><img src={from.img} /></div>
                    <input className="crypto_tic" value={from.ticker} disabled></input>
                </div>
                <button className="drop_button" onClick={handleOpen}>
                    <img src={require('../Vector.svg').default} alt="vector" />
                </button>
            </div>
            <input className="search" onChange={e => setQuery(e.target.value)}  type="text"   />
            {
                isOpen && (
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

export default Left;
