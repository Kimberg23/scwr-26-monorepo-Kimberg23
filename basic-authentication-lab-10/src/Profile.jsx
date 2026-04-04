import { withAuthenticator, useAuthenticator } from "@aws-amplify/ui-react";
import Container from "./Container";

function Profile({ signOut }) {
    const { user } = useAuthenticator((context) => [context.user]);
    
    return (
        <Container>
            <h1>Profile</h1>
            <h2>Username: {user?.username ?? 'unknown'}</h2>
            <h3>Email: {user?.attributes?.email ?? 'unknown'}</h3>
            <h4>Phone: {user?.attributes?.phone_number ?? 'unknown'}</h4>
            <button onClick={signOut}>Sign Out</button>
        </Container>
    );
}

export default withAuthenticator(Profile);