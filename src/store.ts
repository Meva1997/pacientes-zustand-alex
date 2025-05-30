import { create } from "zustand" // Zustand is a state management library
import { createJSONStorage, devtools, persist} from "zustand/middleware" // devtools is a middleware for Zustand that allows you to use Redux DevTools for debugging
// that allows you to create a store for managing state in React applications.
import { v4 as uuidv4} from 'uuid'
import type { DraftPatient, Patient } from "./types"


type PatientState = {
  patients: Patient[] // Array of patients, where each patient is of type Patient
  activeId: Patient['id'] // ID of the currently active patient, can be used for editing purposes
  addPatient:(data: DraftPatient) => void // Function to add a new patient, taking data of type DraftPatient
  deletePatient: (id: Patient['id']) => void // Function to delete a patient by ID
  getPatientById: (id: Patient['id']) => void // Function to get a patient by ID, not implemented in this snippet
  updatePatient: (data: DraftPatient) => void 
  
}

const createPatient = (patient: DraftPatient): Patient => { 
  return{...patient, id: uuidv4()} // Function to create a new patient object with a unique ID
}

export const usePatientStore = create<PatientState>()(
  devtools(
  persist(  (set) => ({ // Zustand store for managing patient state
      patients: [], // Initial state with an empty array of patients
      activeId: '', // Initial state for active patient ID, can be used for editing purposes
      // Function to add a new patient to the store
      addPatient:(data) => {
        
        const newPatient = createPatient(data) 
        // Create a new patient object using the provided data
        set((state) => ({
          patients: [...state.patients, newPatient] // Add the new patient to the existing array of patients
        }))
      },
      deletePatient: (id) => {
        // Function to delete a patient by ID
        set((state) => ({
          patients: state.patients.filter((patient) => patient.id !== id) // Filter out the patient with the specified ID
        }))
      },
      getPatientById: (id) => {
        
        set(() => ({
          activeId: id // Set the active patient ID to the specified ID
        }))
      },
      updatePatient: (data) => {
        //If i need to recover something from store i need to add state as parameter
        set(state => ({
          patients: state.patients.map(patient => patient.id === state.activeId ? {id: state.activeId, ...data} : patient), // Update the patient with the specified ID
          activeId: '' // Reset the active ID after updating
        }))
      }

    }), {
      name: 'patients-storage', // Name of the storage for persistence
      storage: createJSONStorage(() => localStorage)// Use localStorage for persistence
    }) 
))