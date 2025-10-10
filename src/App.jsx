import './App.css'
import RegistrationForm from './components/RegistrationForm'
import FormikForm from './components/formikForm'

function App() {
  return (
    <div className="App">
      <h1>Form Handling in React</h1>
      
      {/* Original controlled components form */}
      <RegistrationForm />
      
      {/* Formik-based form */}
      <FormikForm />
    </div>
  )
}

export default App
