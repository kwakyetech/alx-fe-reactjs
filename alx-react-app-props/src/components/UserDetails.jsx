import React, { useContext } from 'react';
import UserContext from './UserContext';



function UserDetails() {
    const { userData } = useContext(UserContext);
    
    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <p style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>
                Name: {userData.name}
            </p>
            <p style={{ fontSize: '16px', color: '#333' }}>
                Email: {userData.email}
            </p>
        </div>
    );
}

export default UserDetails;
