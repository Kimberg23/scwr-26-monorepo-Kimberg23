import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HomePage, CounterButtonPage, PeopleListPage, NotFoundPage } from './pages';
import { CongratulationsMessage } from './CongratulationsMessage';
import { Greeting } from './Greeting';
import PeopleList from './PeopleList';
import './App.css';

const people = [{
  name: 'Tom',
  age: 40,
  hairColor: 'black'
}, {
  name: 'Harry',
  age: 20,
  hairColor: 'green'
}, {
  name: 'Ron',
  age: 35,
  hairColor: 'brown',
}];

function App() {

   const [numberOfClicks, setNumberOfClicks] = useState(0);
   const [hideMessage, setHideMessage] = useState(false);
   
   const increment = () => setNumberOfClicks(numberOfClicks + 1);

    return (
    <div className="App">
      <Router>
        <Link to="/counter">Go to Counter Page</Link>
        <Link to="/people-list">Go to People List Page</Link>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/counter" element={<CounterButtonPage />} />
          <Route path="/people-list" element={<PeopleListPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
