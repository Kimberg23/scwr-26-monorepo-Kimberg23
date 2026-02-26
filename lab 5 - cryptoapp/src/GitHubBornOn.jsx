import { useEffect, useState } from "react";

function GitHubBornOn () {
    const [bornOn, setBornOn] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        async function fetchBornOn() {
            const response = await fetch('https://api.github.com/users/kimberg23');
            const data = await response.json();
            setBornOn(data.created_at);
            setName(data.login);
        }
        fetchBornOn();
    }, []);
    return (
        <div>
            <h3>The GitHub User {name} was born on {bornOn}</h3>
        </div>
    );
}

export default GitHubBornOn;