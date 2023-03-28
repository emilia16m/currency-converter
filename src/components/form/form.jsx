/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './form.css';

function Forms() {
  return (
    <div className="form">
      <div className="container">
        <div className="form_wrapp">
          <div className="input_wrapp">
            <label>Your Ethereum address</label>
            <input />
          </div>
          <button type="button" className="btn_form">EXCHANGE</button>
        </div>
      </div>
    </div>
  );
}

export default Forms;
