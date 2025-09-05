const UserProfile = (props) => {
    return (
        <div style={{ border: '1px solid gray', padding: '10px', margin: '10px', textAlign: 'center' }}>
            <h2 style={{ color: 'blue' }}>{props.name}</h2>
            <p style={{ color: 'green', fontWeight: 'bold' }}>Age: {props.age}</p>
            <p style={{ color: 'red' }}>Bio: {props.bio}</p>
        </div>
    );
};

export default UserProfile;
