import { useContext, createContext, useState, ReactNode } from "react";
import { AuthResponse, User, SelectedInterest, messageProps} from "../types/Types";

interface AuthContextType {
    isAuthenticated: boolean;
    saveUser: (userData: AuthResponse) => void;
    saveInterest: (Interest: SelectedInterest) => void;
    data: User | null;
    closeSection: () => void;
    selectedInterest: SelectedInterest | null;
    itemToEdit: string | null;
    handleItemId: (id: string) => void;
    message: messageProps | null;
    handleMesage: (text: string, type: string) => void;
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
    selectedInterest: null,
    itemToEdit: null,
    handleItemId: () => {},
    message: null,
    handleMesage: () => {}
});

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState<User | null>(null);
    const [selectedInterest, setSelectedInterest] = useState<SelectedInterest | null>(null);
    const [itemToEdit, setItemToEdit] = useState<string | null>(null);
    const [message, setMessage] = useState<messageProps | null>(null);

    function saveUser(userData: AuthResponse) {
        console.log("Saving user data:", userData.body.user);  // Log user data being saved
        setData(userData.body.user);
        setIsAuthenticated(true);
    }

    function handleMesage(text: string, type: string){
        setMessage({text: text, type: type});
    }

    function handleItemId(id: string) {
        if(id === 'noID'){
            setItemToEdit(null);
        } else {
            setItemToEdit(id)
        }
        
    }

    function saveInterest(interest: SelectedInterest){
        setSelectedInterest(interest)
    }

    function closeSection(){
        setData(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, saveUser, data, closeSection, selectedInterest, saveInterest, itemToEdit, handleItemId, message, handleMesage}}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
