import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(null);
    const [patientId, setPatientId] = useState(null);
    const [patientName, setPatientName] = useState(null)

    const login = (newToken, id) => {
        // setToken(newToken);
        setPatientId(id);
    };


    return (
        <AuthContext.Provider value={{ token, setToken, patientId, setPatientId, patientName, setPatientName}}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
} 