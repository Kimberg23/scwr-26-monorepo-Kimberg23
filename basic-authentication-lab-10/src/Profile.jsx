import { useState, useEffect } from 'react';
import { withAuthenticator, useAuthenticator } from "@aws-amplify/ui-react";
import Container from "./Container";

function Profile({ signOut }) {

    // useEffect(() => {
    //     checkUser();
    // }, []);
    const { user } = useAuthenticator((context) => [context.user]);
    return (
        <Container>
            <h1>Profile</h1>
            <h2>Username: {user?.username}</h2>
            <h3>Email: {user?.attributes?.email}</h3>
            <h4>Phone: {user?.attributes?.phone_number ?? 'unknown'}</h4>
            <button onClick={signOut}>Sign Out</button>
        </Container>
    );
}

export default withAuthenticator(Profile);