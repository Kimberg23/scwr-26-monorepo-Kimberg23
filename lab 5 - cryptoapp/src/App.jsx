import './App.css';
import { useEffect, useState } from 'react';
import { get } from 'aws-amplify/api';

function App() {
  const [coins, setCoins] = useState([]);

  async function fetchCoins() {
    const request = get({
      apiName: 'cryptoapi',
      path: '/coins',
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
