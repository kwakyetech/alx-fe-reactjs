import React from 'react';

const UserContext = React.createContext({
    userData: {
        name: '',
        email: ''
    }
});

export default UserContext;

