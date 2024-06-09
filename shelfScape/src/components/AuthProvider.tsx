import { useContext, createContext, useState, ReactNode } from "react";
import { AuthResponse, User } from "../types/Types";

interface AuthContextType {
    isAuthenticated: boolean;
    saveUser: (userData: AuthResponse) => void;
    data: User | null;
    closeSection: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    saveUser: () => {},
    data: null,
    closeSection: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState<User | null>(null);

    function saveUser(userData: AuthResponse) {
        console.log("Saving user data:", userData.body.user);  // Log user data being saved
        setData(userData.body.user);
        setIsAuthenticated(true);
    }

    function closeSection(){
        setData(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, saveUser, data, closeSection }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
