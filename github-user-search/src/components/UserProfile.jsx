const UserProfile = ({ user, loading, error }) => {
  if (loading) {
    return <div className="text-center py-12 text-lg text-indigo-600">Loading...</div>;
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center border border-red-200">Error: {error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 flex gap-8 items-start">
      <div className="flex-shrink-0">
        <img 
          src={user.avatar_url} 
          alt={`${user.login}'s avatar`} 
          className="w-32 h-32 rounded-full border-4 border-gray-100 shadow-md"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{user.name || user.login}</h2>
        <p className="text-indigo-600 text-lg font-medium mb-4">@{user.login}</p>
        {user.bio && <p className="text-gray-600 mb-6 leading-relaxed">{user.bio}</p>}
        <div className="flex gap-8 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{user.public_repos}</div>
            <div className="text-gray-500 text-sm uppercase tracking-wide">Repositories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{user.followers}</div>
            <div className="text-gray-500 text-sm uppercase tracking-wide">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{user.following}</div>
            <div className="text-gray-500 text-sm uppercase tracking-wide">Following</div>
          </div>
        </div>
        {user.location && <p className="text-gray-600 mb-4 text-sm">📍 {user.location}</p>}
        {user.html_url && (
          <a 
            href={user.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-300/30 mt-4"
          >
            View on GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default UserProfile;