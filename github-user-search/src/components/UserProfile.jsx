const UserProfile = ({ user, loading, error }) => {
  if (loading) {
    return <div className="text-center py-8 sm:py-12 text-base sm:text-lg text-indigo-600">Loading...</div>;
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-3 sm:p-4 rounded-lg text-center border border-red-200 mx-4 sm:mx-0 text-sm sm:text-base">Error: {error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100 flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-start mx-4 sm:mx-0">
      <div className="flex-shrink-0 self-center sm:self-start">
        <img 
          src={user.avatar_url} 
          alt={`${user.login}'s avatar`} 
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-gray-100 shadow-md"
        />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">{user.name || user.login}</h2>
        <p className="text-indigo-600 text-base sm:text-lg font-medium mb-3 sm:mb-4">@{user.login}</p>
        {user.bio && <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{user.bio}</p>}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-4 sm:mb-6 justify-center sm:justify-start">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-gray-800">{user.public_repos}</div>
            <div className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide">Repositories</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-gray-800">{user.followers}</div>
            <div className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-gray-800">{user.following}</div>
            <div className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide">Following</div>
          </div>
        </div>
        {user.location && <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">📍 {user.location}</p>}
        {user.html_url && (
          <a 
            href={user.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-300/30 mt-2 sm:mt-4 text-sm sm:text-base w-full sm:w-auto text-center"
          >
            View on GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default UserProfile;