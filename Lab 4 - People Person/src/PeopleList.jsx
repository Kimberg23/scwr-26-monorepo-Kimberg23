import Person from './Person';

const PeopleList = ({ people }) => {
    return (
      <>
        <p>This is the peopleList component</p>
        {/* {JSON.stringify(people)} */}
        {people.map(person => (
            <Person key={person.name} individual={person} />
        ))}
      </>
    )
}

export default PeopleList;