import { useContext } from "react";
import { AuthContext } from "../Authentication/Provider";
import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
    const { user } = useContext(AuthContext);
    const { isLoading, refetch, data: menu = [] } = useQuery({
      queryKey: ['users', user?.email],
      queryFn: async () => {
        const res = await fetch('http://localhost:3000/users');
        const usersData = await res.json();
  
        // Filter the data based on the user's email
        const filteredMenu = usersData.filter(userData => userData.email === user?.email);

        return filteredMenu;
      }
    });
  
    return [menu, isLoading, refetch];
  };
  
  export default useMenu;
  
