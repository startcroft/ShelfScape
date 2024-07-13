import { useContext, createContext, useState, ReactNode } from "react";
import { AuthResponse, User, SelectedInterest } from "../types/Types";

interface AuthContextType {
    isAuthenticated: boolean;
    saveUser: (userData: AuthResponse) => void;
    saveInterest: (Interest: SelectedInterest) => void;
    data: User | null;
    closeSection: () => void;
    selectedInterest: SelectedInterest | null
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    saveUser: () => {},
    saveInterest: () => {},
    data: null,
    closeSection: () => {},
    selectedInterest: null
});

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState<User | null>(null);
    const [selectedInterest, setSelectedInterest] = useState<SelectedInterest | null>(null)

    function saveUser(userData: AuthResponse) {
        console.log("Saving user data:", userData.body.user);  // Log user data being saved
        setData(userData.body.user);
        setIsAuthenticated(true);
    }

    function saveInterest(interest: SelectedInterest){
        setSelectedInterest(interest)
    }

    function closeSection(){
        setData(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, saveUser, data, closeSection, selectedInterest, saveInterest}}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
