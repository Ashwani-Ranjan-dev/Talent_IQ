import { Children } from "react";
import { createContext , useContext , useEffect , useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [user , setUser] = useState(null);

    const [loading , setLoading] = useState(true);

    // Fetching User in through Frontend
    const fetchCurrentUser = async() =>{
        try{

            const response = await api.get("/auth/me");
            setUser(response.data.data);
        }
        catch(error){
            setUser(null);
        }
        finally{
            setLoading(false);
        }
    };

    // Logout Function 
    const logout = async() =>{
        try{
            await api.post("/auth/logout");
            setUser(null);
        }
        catch(error){
            console.error("Logout failed: " , error);
        }
    };


    useEffect(() => {
        fetchCurrentUser();
    } , []);

    return(
        <AuthContext.Provider

        value={{
            user,
            setUser,
            loading,
            fetchCurrentUser,
            logout
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}