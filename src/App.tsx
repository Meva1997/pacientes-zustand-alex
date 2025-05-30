import {ToastContainer} from "react-toastify"
import Form from "./components/Form"
import PatientsList from "./components/PatientsList"


function App() {

  return (
    <>
      <div className="container mx-auto mt-20">
        <h1 className="text-5xl font-black text-center md:w-2/3 md:mx-auto">Seguimiento de Pacientes de {''} <span className="text-indigo-700"> Veterinaria </span></h1>
        <div className="mt-12 md:flex">
          <Form />
          <PatientsList />
        </div>
      </div>

      <ToastContainer 
      />
    </>
  )
}

export default App
