import { useState, useEffect } from 'react';
import { fetchUserAttributes} from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Container from "./Container";

function Profile({signOut, user}) {

    useEffect(() => {
        checkUser();
    }, []);

    const [currentUser, setCurrentUser] = useState({user});

    async function checkUser() {
        try {
            const userAttributes = await fetchUserAttributes();
            setCurrentUser({...userAttributes, ...user});
        }
        catch (error){
            console.error("Error", error);
        }
    }
    return (
        <Container>
            <h1>Profile</h1>
            <h2>Username: {currentUser.username}</h2>
            <h3>Email: {currentUser.email}</h3>
            <h4>Phone: {currentUser.phone_number ?? 'unknown'}</h4>
            <button onClick={signOut}>Sign Out</button>
        </Container>
    );
}

export default withAuthenticator(Profile);