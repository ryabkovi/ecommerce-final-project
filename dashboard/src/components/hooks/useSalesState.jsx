import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

function useSalesState() {
  const [sales, setSales] = useState(0);
  const { loading, isAuth } = useContext(AuthContext);

  useEffect(() => {
    if (loading || !isAuth) return;

    const fetchSales = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/orders/analytics/orders-summary`,
          {
            withCredentials: true,
          }
        );

        setSales(data?.data?.[0]?.totalIncome || 0);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchSales();
  }, [loading, isAuth]);

  return sales;
}

export default useSalesState;
