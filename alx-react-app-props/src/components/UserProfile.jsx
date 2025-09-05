import React, { useContext } from 'react';
import UserContext from './UserContext';

const UserProfile = () => {
    const { userData } = useContext(UserContext);
    
    return (
        <div style={{
            padding: '20px',
            margin: '10px',
            borderRadius: '8px',
            backgroundColor: '#f5f5f5'
        }}>
            <h2 style={{
                color: '#333',
                fontSize: '24px',
                marginBottom: '10px'
            }}>{userData.name}</h2>
            <p style={{
                color: '#666',
                fontSize: '16px',
                marginBottom: '8px'
            }}>Age: {userData.age}</p>
            <p style={{
                color: '#666',
                fontSize: '16px',
                lineHeight: '1.5'
            }}>Bio: {userData.bio}</p>
        </div>
    );
};

export default UserProfile;