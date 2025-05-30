import { usePatientStore } from "../store"
import PatientDetails from "./PatientDetails"

export default function PatientsList() {

  const patients = usePatientStore((state) => state.patients)
  // Alternatively, you can destructure the store to get patients directly
  // const { patients } = usePatientStore()
  

  return (
    
    <>
      <div className="overflow-y-scroll md:w-1/2 lg:w-3/5 md:h-screen">
        <h2 className="text-3xl font-black text-center">Listado Pacientes</h2>

        <p className="mt-5 mb-10 text-lg text-center">
          Administra tus {''}
          <span className="font-bold text-indigo-600">Pacientes y Citas</span>
        </p>

        {patients.length ? (
          
          patients.map((patient) => (
            <PatientDetails
              key={patient.id}
              patient={patient} // Pass the patient object to the PatientDetails component
              />
          ))
        ) : (
          <p className="text-center animate-pulse">No hay pacientes registrados</p>
        
        )}
      </div>
    </>
  )

}
