import ProfilePage from './components/ProfilePage';
import UserProfile from './components/UserProfile';
import UserContext from './components/UserContext';


function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com", age: 28, bio: "Software developer with a passion for React and modern web technologies." };

  return (
    <UserContext.Provider value={{ userData }}>
      <ProfilePage />
      <UserProfile />
    </UserContext.Provider>
  );
}

export default App;
