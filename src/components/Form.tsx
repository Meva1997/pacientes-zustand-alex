import { useForm } from "react-hook-form"
import Error from "./Error";
import { type DraftPatient } from "../types";
import { usePatientStore } from "../store"; // Importing the Zustand store for managing patient data
import { useEffect, useState } from "react";


export default function PatientForm() {

  const[successMessage, setSuccessMessage] = useState<string>(''); // State to manage success messages

  //another way to import the store
  //const addPatient = usePatientStore((state) => state.addPatient)
  const{addPatient, activeId, patients, updatePatient } = usePatientStore()


  // Configuración de react-hook-form
  // DraftPatient es un tipo que excluye el campo 'id' del tipo Patient
  // Esto es útil para formularios donde no necesitamos el ID del paciente al crear uno nuevo
  // 'register' es una función que se usa para registrar los campos del formulario
  // 'handleSubmit' es una función que se usa para manejar el envío del formulario
  // 'formState' contiene el estado del formulario, incluyendo errores
  // 'errors' es un objeto que contiene los errores de validación de los campos del formulario
  const {register, handleSubmit, setValue ,formState:{errors }, reset} = useForm<DraftPatient>() 

  useEffect(() => {
    if(activeId){
      const activePatient = patients.filter( patient => patient.id === activeId)[0];
      setValue('name', activePatient.name); // Establece el valor del campo 'name' en el formulario
      setValue('caretaker', activePatient.caretaker); // Establece el valor del campo 'caretaker' en el formulario
      setValue('email', activePatient.email); // Establece el valor del campo 'email' en el formulario
      setValue('date', activePatient.date); // Establece el valor del campo 'date' en el formulario
      setValue('symptoms', activePatient.symptoms); // Establece el valor del campo 'symptoms' en el formulario
    }
  }, [activeId, patients, setValue]) // Dependencias del useEffect: se ejecuta cuando activeId o patients cambian


  // Función que se ejecuta al enviar el formulario
  // 'data' es el objeto que contiene los valores de los campos del formulario
  // En este caso, se espera que 'data' sea del tipo DraftPatient
  const registerPatient = (data : DraftPatient) => {
    
    if(activeId){
      updatePatient(data); // Si hay un ID activo, actualiza el paciente existente
      reset(); // Resetea el formulario después de actualizar el paciente
      setSuccessMessage('Paciente actualizado correctamente'); // Establece un mensaje de éxito
      setTimeout(() => {
        setSuccessMessage(''); // Limpia el mensaje de éxito después de 3 segundos
      }, 3000);
    } else {

      // Aquí puedes manejar el registro del paciente
      addPatient(data); // Llama a la función addPatient del store para agregar el paciente
      reset(); // Resetea el formulario después de agregar el paciente
      setSuccessMessage('Paciente registrado correctamente'); // Establece un mensaje de éxito
      setTimeout(() => {
        setSuccessMessage(''); // Limpia el mensaje de éxito después de 3 segundos
      }
      , 3000);
    }
    
  }

  
  
  return (
    <div className="mx-5 md:w-1/2 lg:w-2/5">
        <h2 className="text-3xl font-black text-center">Seguimiento Pacientes</h2>

        <p className="mt-5 mb-10 text-lg text-center">
            Añade Pacientes y {''}
            <span className="font-bold text-indigo-600">Administralos</span>
        </p>

        <form 
            className="px-5 py-10 mb-10 bg-white rounded-lg shadow-md"
            noValidate
            onSubmit={handleSubmit(registerPatient)}
        >
              <div className="mb-5">
                  <label htmlFor="name" className="text-sm font-bold uppercase">
                      Paciente 
                  </label>
                  <input  
                      id="name"
                      className="w-full p-3 border border-gray-100"  
                      type="text" 
                      placeholder="Nombre del Paciente" 
                      {...register('name',{
                        required: 'El nombre del paciente es obligatorio',
                        minLength: {
                          value: 3,
                          message: 'El nombre debe tener minimo 3 caracteres'
                        }
                      })}
                  />
                  {/* Mostrar error si existe */}
                  {errors.name && 
                    <Error >
                      {errors.name.message}
                    </Error>
                  }
                  
                  
              </div>

              <div className="mb-5">
                <label htmlFor="caretaker" className="text-sm font-bold uppercase">
                    Propietario 
                </label>
                <input  
                    id="caretaker"
                    className="w-full p-3 border border-gray-100"  
                    type="text" 
                    placeholder="Nombre del Propietario" 
                    {...register('caretaker',{
                      required: 'El nombre del propietario es obligatorio',
                      minLength: {
                        value: 3,
                        message: 'El nombre del propietario debe tener minimo 3 caracteres'
                      }
                    })}
                />

                {/* Mostrar error si existe */}
                {errors.caretaker &&
                  <Error>
                    {errors.caretaker.message}
                  </Error>
                }
              </div>

            <div className="mb-5">
              <label htmlFor="email" className="text-sm font-bold uppercase">
                  Email 
              </label>
              <input  
                  id="email"
                  autoComplete="email"
                  className="w-full p-3 border border-gray-100"  
                  type="email" 
                  placeholder="Email de Registro" 
                  {...register('email',{
                    required: 'El email es obligatorio',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'El email no es válido'
                    }
                  })}
              />
              {/* Mostrar error si existe */}
              {errors.email &&
                <Error>
                  {errors.email.message}
                </Error>
              }
            </div>

            <div className="mb-5">
                <label htmlFor="date" className="text-sm font-bold uppercase">
                    Fecha Alta 
                </label>
                <input  
                    id="date"
                    className="w-full p-3 border border-gray-100"  
                    type="date" 
                    {...register('date',{
                      required: 'La fecha de alta es obligatoria',
                      validate: {
                        notInFuture: (value) => {
                          const today = new Date();
                          const selectedDate = new Date(value);
                          return selectedDate <= today || 'La fecha no puede ser en el futuro';
                        }
                      }
                    })}
                />
                {/* Mostrar error si existe */}
                {errors.date &&
                  <Error>
                    {errors.date.message}
                  </Error>
                }
            </div>
            
            <div className="mb-5">
                <label htmlFor="symptoms" className="text-sm font-bold uppercase">
                Síntomas 
                </label>
                <textarea  
                    id="symptoms"
                    className="w-full p-3 border border-gray-100"  
                    placeholder="Síntomas del paciente" 
                    {...register('symptoms',{
                      required: 'Los síntomas son obligatorios'
                    })}
                ></textarea>
                {/* Mostrar error si existe */}
                {errors.symptoms &&
                  <Error>
                    {errors.symptoms.message}
                  </Error>
                }
            </div>

            <input
                type="submit"
                className="w-full p-3 font-bold text-white uppercase transition-colors bg-indigo-600 cursor-pointer hover:bg-indigo-700"
                value={activeId ? 'Actualizar Paciente' : 'Registrar Paciente'}
            />
            
            {/* Mostrar mensaje de éxito si existe */}
            {successMessage &&
              <p className="p-3 mt-5 text-sm font-bold text-center text-white uppercase bg-green-500 border-green-600 rounded-lg">
                {successMessage}
              </p>
            }

        </form> 
    </div>
  )
}