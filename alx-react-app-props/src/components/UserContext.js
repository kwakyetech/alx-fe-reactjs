import React from 'react';

const UserContext = React.createContext({
    userData: {
        name: '',
        email: '',
        age: '',
        bio: ''
    }
});

export default UserContext;

