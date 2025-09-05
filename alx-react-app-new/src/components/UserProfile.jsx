const UserProfile = (props) => {
    return (
        <div style={{ border: '1px solid gray', padding: '10px', margin: '10px', textAlign: 'center' }}>
            <h2 style={{ color: 'blue' }}>{props.name}</h2>
            <p>Age: <span style={{ color: 'green', fontWeight: 'bold' }}>{props.age}</span></p>
            <p >Bio: <span style={{ color: 'red', fontWeight: 'bold' }}>{props.bio}</span></p>
        </div>
    );
};

export default UserProfile;
