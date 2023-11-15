import React, { useState, useEffect } from 'react'
import "./App.css";
import { FaExchangeAlt } from "react-icons/fa";
import { Data, fetchAPI } from "./API"

const App = () => {
  const flagBaseUrl = "https://flagcdn.com/48x36/";
  const currencies = {
    EUR: ['Euro',],
    USD: ['US Dollar',],
    JPY: ['Japanese Yen',],
    BGN: ['Bulgarian Lev',],
    CZK: ['Czech Republic Koruna',],
    DKK: ['Danish Krone',],
    GBP: ['British Pound Sterling',],
    HUF: ['Hungarian Forint',],
    PLN: ['Polish Zloty',],
    RON: ['Romanian Leu',],
    SEK: ['Swedish Krona',],
    CHF: ['Swiss Franc',],
    ISK: ['Icelandic Króna',],
    NOK: ['Norwegian Krone',],
    HRK: ['Croatian Kuna',],
    RUB: ['Russian Ruble',],
    TRY: ['Turkish Lira',],
    AUD: ['Australian Dollar',],
    BRL: ['Brazilian Real',],
    CAD: ['Canadian Dollar',],
    CNY: ['Chinese Yuan',],
    HKD: ['Hong Kong Dollar',],
    IDR: ['Indonesian Rupiah',],
    ILS: ['Israeli New Sheqel',],
    INR: ['Indian Rupee',],
    KRW: ['South Korean Won',],
    MXN: ['Mexican Peso',],
    MYR: ['Malaysian Ringgit',],
    NZD: ['New Zealand Dollar',],
    PHP: ['Philippine Peso',],
    SGD: ['Singapore Dollar',],
    THB: ['Thai Baht',],
    ZAR: ['South African Rand',],
  };

  const [valueFirst, setValueFirst] = useState("0");
  const [convertedValue, setConvertedValue] = useState("0");

  const [currencyone, setCurrencyOne] = useState("USD");
  const [currencytwo, setCurrencyTwo] = useState("INR");

  const convertCurrency = () => {
    const two = Data.data[currencytwo];
    const one = Data.data[currencyone];
    if (one !== undefined) {
      const converted = (
        valueFirst * (two / one)
      ).toFixed(3);
      setConvertedValue(converted);
    } else {
      console.error("Error");
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  useEffect(() => {
    convertCurrency();
  }, [currencyone, currencytwo, valueFirst]);

  const getFlagUrl = (currency) => {
    const shortenedCurrency = currency.substring(0, 2);
    return `${flagBaseUrl}${shortenedCurrency.toLowerCase()}.png`;
  };

  const swapCurrencies = () => {
    setCurrencyOne(currencytwo);
    setCurrencyTwo(currencyone);
  };

  return (
    <>
      <div className='xd'>
        <h1 className='heading'>Swift Coin Exchange</h1>
        <img src="/coin.svg" alt="" width="100%" />
      </div>
      <div className="container">
        <div className='form'>
          <div className="amount">
            <p>Amount</p>
            <input type="number" name="valueFirst" id='valueFirst' value={valueFirst} onChange={(e) => setValueFirst(e.target.value)} inputMode="numeric" />
          </div>
          <div className="convert-box">
            <div className="from">
              <p>From</p>
              <div className="select-input">
                <img src={getFlagUrl(currencyone)} alt="" />
                <select value={currencyone} name='currencyone' onChange={(e) => setCurrencyOne(e.target.value)}>
                  {Object.keys(currencies).map((x) => (
                    <option key={x} value={x}>
                      {x} - {currencies[x]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='reverse' onClick={swapCurrencies}>
              <FaExchangeAlt />
            </div>

            <div className="camount">
              <p>Converted Amount</p>
              <input type="text" name="convertedValue" id='convertedValue' value={convertedValue} readOnly />
            </div>

            <div className="to">
              <p>To</p>
              <div className="select-input">
                <img src={getFlagUrl(currencytwo)} alt="" />
                <select name='currencytwo' value={currencytwo} onChange={(e) => setCurrencyTwo(e.target.value)}>
                  {Object.keys(currencies).map((x) => (
                    <option key={x} value={x}>
                      {x} - {currencies[x]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App