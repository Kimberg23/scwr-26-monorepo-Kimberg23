import './App.css'
import PeopleList from './PeopleList';

function App() {

  const people = [
    {
      name: 'Juan',
      favoriteNumber: 4,
      favoriteColor: [
        'green', 'blue', 'purple'
      ]
    },
    {
      name: 'Sara',
      // favoriteNumber: 4,
      favoriteColor: [
        'green', 'blue', 'purple'
      ]
    },
    {
      name: 'Ryan',
      favoriteNumber: 7,
      favoriteColor: []
    }
  ]


  return (
    <>
      <h1>Hello React!</h1>
      <PeopleList people={people}/>
    </>
  )
}

export default App
