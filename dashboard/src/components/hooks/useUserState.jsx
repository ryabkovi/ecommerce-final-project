import { useEffect, useState } from "react";
import axios from "axios";

function useUserState() {
  const [user, setUser] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users/all`,
          {
            withCredentials: true,
          }
        );
        setUser(data?.data.length || []);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return user;
}

export default useUserState;
