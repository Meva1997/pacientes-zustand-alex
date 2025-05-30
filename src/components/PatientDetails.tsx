import type { Patient } from "../types"
import PatientDetailItem from "./PatientDetailItem"
import { usePatientStore } from "../store"
import {toast, Bounce} from "react-toastify"

type PatientDetailsProps = {
  patient: Patient
}


export default function PatientDetails({  patient }: PatientDetailsProps) {

  const deletePatient = usePatientStore((state) => state.deletePatient) // Access the deletePatient function from the store, if needed
  const getPatientById = usePatientStore((state) => state.getPatientById) // Access the getPatientById function from the store, if needed

  const notify = (message: string) => toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
  });

  return (

    <div className="px-5 py-10 mx-5 my-10 bg-white shadow-md rounded-xl">
      <PatientDetailItem label="Nombre" data={patient.name} />
      <PatientDetailItem label="Propietario" data={patient.caretaker} />
      <PatientDetailItem label="Email" data={patient.email} />
      <PatientDetailItem label="Fecha de alta" data={patient.date.toString()} />
      <PatientDetailItem label="Sintomas" data={patient.symptoms} />

      <div className="flex flex-col w-1/2 gap-3 mx-auto mt-10 md:w-full md:flex-row justify-evenly">
        <button className="px-5 py-2 font-bold text-white uppercase bg-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-700" type="button" onClick={() => getPatientById(patient.id)}>
          Editar
        </button>
        <button className="px-5 py-2 font-bold text-white uppercase bg-red-500 border-red-600 rounded-lg cursor-pointer hover:bg-red-600" type="button" onClick={() => {
          deletePatient(patient.id);
          notify("Paciente eliminado correctamente");
          } 
        }>
          Eliminar
        </button>
      </div>

    </div>
  )
}
