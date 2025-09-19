# GitHub User Search Application

A modern, responsive React application for searching GitHub users with advanced filtering capabilities and pagination. Built with React, Vite, Tailwind CSS, and the GitHub API.

## 🌐 Live Demo

**[View Live Application](https://hubuserfinder.vercel.app/)**

The application is deployed on Vercel and fully functional with all features available.

## 🚀 Features

### Search Modes
- **Username Search**: Quick lookup of specific GitHub users by username
- **Advanced Search**: Filter users by multiple criteria:
  - Username/keyword search
  - Location filter
  - Minimum repositories count

### User Interface
- **Modern Design**: Clean, responsive UI built with Tailwind CSS
- **Search Type Toggle**: Easy switching between search modes
- **Loading States**: Animated spinners and loading indicators
- **Error Handling**: User-friendly error messages and validation
- **Responsive Layout**: Mobile-first design that works on all devices

### Results Display
- **Single User View**: Detailed profile information including:
  - Avatar, name, and bio
  - Location and company
  - Repository and follower counts
  - Direct link to GitHub profile
- **Multiple Users Grid**: Card-based layout showing:
  - User avatars and usernames
  - Search relevance scores
  - Quick access to GitHub profiles

### Pagination
- **Load More Functionality**: Seamless browsing of large result sets
- **Progress Tracking**: Shows current results count vs total available
- **Async Loading**: Non-blocking pagination with loading states

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Axios**: HTTP client for API requests
- **GitHub API**: Official GitHub REST API for user data

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- GitHub Personal Access Token (for API access)

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd github-user-search
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Create a `.env` file in the root directory
   - Add your GitHub Personal Access Token:
     ```
     VITE_GITHUB_API_KEY=your_github_token_here
     ```
   - To get a GitHub token:
     - Go to GitHub Settings → Developer settings → Personal access tokens
     - Generate a new token with appropriate permissions

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`

## 🎯 Usage

### Username Search
1. Select "Username Search" mode
2. Enter a GitHub username
3. Click "Search User" to view detailed profile information

### Advanced Search
1. Select "Advanced Search" mode
2. Fill in search criteria:
   - **Username/Keyword**: Search term for usernames or profiles
   - **Location**: Filter by user location (optional)
   - **Min Repositories**: Minimum number of repositories (optional)
3. Click "Search Users" to view results
4. Use "Load More Results" to browse additional pages

## 📁 Project Structure

```
src/
├── components/
│   └── Search.jsx          # Main search component with UI and logic
├── services/
│   └── githubService.js    # GitHub API integration and data fetching
├── App.jsx                 # Root application component
├── main.jsx               # Application entry point
└── index.css              # Global styles and Tailwind imports
```

## 🔑 Key Components

### Search Component (`src/components/Search.jsx`)
- Handles both username and advanced search modes
- Manages search state and user interactions
- Renders results with responsive design
- Implements pagination logic

### GitHub Service (`src/services/githubService.js`)
- `fetchUserData()`: Retrieves detailed user information by username
- `searchUsers()`: Performs advanced user searches with filtering and pagination
- Error handling and rate limit management

## 🎨 Styling

The application uses Tailwind CSS for styling with:
- Responsive grid layouts
- Modern color schemes and typography
- Smooth transitions and hover effects
- Accessible form controls and buttons
- Mobile-first responsive design

## 🚦 API Rate Limits

The GitHub API has rate limits:
- **Authenticated requests**: 5,000 requests per hour
- **Unauthenticated requests**: 60 requests per hour

Using a Personal Access Token is recommended for better rate limits and access to more features.

## 🔮 Future Enhancements

- User favorites and bookmarking
- Repository search integration
- Advanced filtering options (followers, creation date, etc.)
- Export search results
- Dark mode toggle
- Search history

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- GitHub API for providing comprehensive user data
- Tailwind CSS for the excellent utility-first CSS framework
- Vite for the fast and efficient build tool
- React community for the amazing ecosystem
