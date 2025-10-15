import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './components/RegistrationForm'
import FormikForm from './components/formikform';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-8">
      <div className="flex space-x-8 mb-8">
        <a href="https://vite.dev" target="_blank" className="hover:scale-110 transition-transform">
          <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="hover:scale-110 transition-transform">
          <img src={reactLogo} className="h-16 w-16 animate-spin" alt="React logo" />
        </a>
      </div>
      
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Form Handling: React vs Formik
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Traditional React Form</h2>
          <RegistrationForm />
        </div>
        
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Formik-Powered Form</h2>
          <FormikForm />
        </div>
      </div>
      
      <p className="text-gray-500 text-center mt-8 max-w-2xl">
        Compare traditional React form handling with controlled components versus Formik's streamlined approach with built-in validation using Yup.
      </p>
    </div>
  )
}

export default App
