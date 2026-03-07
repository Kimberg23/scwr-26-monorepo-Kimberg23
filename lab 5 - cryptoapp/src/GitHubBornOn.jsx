import { useEffect, useState } from "react";

async function fetchBornOn() {
    const response = await fetch('https://api.github.com/users/kimberg23');
    const data = await response.json();
    return data;
}

function GitHubBornOn () {
    const [bornOn, setBornOn] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
    fetchBornOn().then(data => {
            setBornOn(data.created_at);
            setName(data.login);
        });
    }, []);
    return (
        <div>
            <h3>The GitHub User {name} was born on {bornOn}</h3>
        </div>
    );
}

export default GitHubBornOn;