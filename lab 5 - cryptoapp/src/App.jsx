import './App.css';
import { useEffect, useState } from 'react';
import { get } from 'aws-amplify/api';

function App() {
  const [coins, setCoins] = useState([]);
  const [input, updateInput] = useState({ limit: 5, start: 0})

  function updateInputValues(type, value) {
    updateInput({
      ...input, [type]: value
    })
  }

  async function fetchCoins() {
    const request = get({
      apiName: 'cryptoapi',
      path: `/coins?limit=${input.limit}&start=${input.start}`
    })
    const response = await request.response;
    const data = await response.body.json();
    setCoins(data.coins);
  }

  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <>
      <h1>Hello</h1>
      <input onChange={e => updateInputValues('limit', e.target.value)} placeholder="limit"/>
      <input onChange={e => updateInputValues('start', e.target.value)} placeholder="start"/>
      <button onClick={fetchCoins}>Fetch Coins</button>
      {coins.map((coin, index) => (
        <div key={index}>
          <h2>{coin.name} - {coin.symbol}</h2>
          <h5>${coin.price_usd}</h5>
        </div>
      ))}
    </>
  )
}

export default App
