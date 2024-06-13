import { ReactNode, createContext, useState} from 'react'


interface ModalProviderProps {
    children: ReactNode;
}

type ModalContextData = {
    modalClick: boolean;
    setModalClick: any;
}

export const ModalContext = createContext({} as ModalContextData)

function ModalProvider ({children}: ModalProviderProps) {
        const [modalClick, setModalClick] = useState(false)


    return (
        <ModalContext.Provider value={{modalClick, setModalClick}}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider