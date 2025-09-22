function UserProfile() {
  return (
    <div className="user-profile bg-gray-100 p-8 max-w-sm mx-auto my-20 rounded-lg shadow-lg">
      <img 
        src="src/assets/prince.jpg" 
        alt="User" 
        className="rounded-full w-36 h-36 mx-auto"
      />
      <h1 className="text-xl text-blue-800 my-4">Prince Kwakye Ofori</h1>
      <p className="text-gray-600 text-base">
        Frontend Developer. Passionate about creating beautiful user interfaces and learning new technologies.
      </p>
    </div>
  );
}

export default UserProfile;