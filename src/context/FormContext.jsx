import { createContext, useState } from "react"

const FormContext = createContext({})

export const FormProvider = ({ children }) => {

    const title = {
        0: 'Bodypart',
        1: 'Diagnose',
        2: 'Your Exercise',
        3: 'Do Exercise',
        4: 'Summary!!',
      }

    const [page, setPage] = useState(0)

    return (
        <FormContext.Provider value={{ title, page, setPage}}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext 