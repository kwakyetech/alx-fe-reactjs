function UserProfile() {
  return (
    <div className="user-profile bg-gray-100 p-4 sm:p-4 md:p-8 max-w-xs sm:max-w-xs md:max-w-sm mx-auto my-20 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img 
        src="src/assets/prince.jpg" 
        alt="User" 
        className="rounded-full w-24 h-24 sm:w-24 sm:h-24 md:w-36 md:h-36 mx-auto hover:scale-110 transition-transform duration-300 ease-in-out"
      />
      <h1 className="text-lg sm:text-lg md:text-xl text-blue-800 hover:text-blue-500 my-4 transition-colors duration-300 ease-in-out">Prince Kwakye Ofori</h1>
      <p className="text-gray-600 text-sm sm:text-sm md:text-base">
        Frontend Developer. Passionate about creating beautiful user interfaces and learning new technologies.
      </p>
    </div>
  );
}

export default UserProfile;