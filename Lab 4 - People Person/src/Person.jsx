import './Person.css';
const Person = ({individual}) => {
    const { name, favoriteNumber, favoriteColor } = individual;
    return (
        <div className = 'person'>
        <h2>Hello, {name}!</h2>
        <p>{favoriteNumber ?
            `${name}'s favorite number is ${favoriteNumber}`:
            `${name} doesn't have a favorite number`
            }</p>
            <p>{name}'s favorite colors are:</p>
            <ul>
              {favoriteColor && favoriteColor.length ?
                favoriteColor.map(color => (
                    <li key={color}>{color}</li>
                ))
            :<li>none</li>}
            </ul>
        </div>
    )
}

export default Person;