import React from "react";
import './form.css'
const Forms = () => {
    return (
        <div className="form">
            <div className="container">
                <div className='form_wrapp'>
                    <div className='input_wrapp'>
                        <label>Your Ethereum address</label>
                        <input></input>
                    </div>
                    <button className='btn_form'>EXCHANGE</button>
                </div>
            </div>
        </div>
    )
}

export default Forms;
