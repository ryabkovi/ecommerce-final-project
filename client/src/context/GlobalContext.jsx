// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "./AuthContext";
// import { toggleFavorite as toggleFavoriteService } from "../services/favoriteService";

// export const GlobalContext = createContext();

// function GlobalProvider({ children }) {
//   const { isAuth, user, setUser } = useContext(AuthContext);

//   const [cart, setCart] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [localFavorites, setLocalFavorites] = useState(() => {
//     return JSON.parse(localStorage.getItem("favorites")) || [];
//   });
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   const CART_STORAGE_KEY = "cart";
//   const CART_EXPIRATION_DAYS = 1;

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
//     if (storedCart) {
//       const age = Date.now() - storedCart.createdAt;
//       const maxAge = CART_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
//       if (age < maxAge) {
//         setCart(storedCart.items);
//       } else {
//         localStorage.removeItem(CART_STORAGE_KEY);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const cartData = {
//       items: cart,
//       createdAt: Date.now(),
//     };
//     localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));

//     const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
//     const totalCost = cart.reduce(
//       (acc, item) => acc + item.quantity * item.product_price,
//       0
//     );
//     setTotalProducts(totalItems);
//     setTotalPrice(totalCost);
//   }, [cart]);

//   async function getAllProducts() {
//     try {
//       setIsLoading(true);
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/products/getAllProducts`,
//         { withCredentials: true }
//       );
//       setProducts(data.data);
//     } catch (error) {
//       console.error("❌ Failed to fetch products:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const newCart = [...prevCart];
//       const existing = newCart.find((item) => item._id === product._id);
//       if (existing) {
//         existing.quantity++;
//       } else {
//         newCart.push({ ...product, quantity: 1 });
//       }
//       return newCart;
//     });
//   };

//   const decreaseQuantity = (productId) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item._id === productId
//           ? { ...item, quantity: Math.max(1, item.quantity - 1) }
//           : item
//       )
//     );
//   };

//   const removeFromCart = (productId) => {
//     setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
//   };

//   const clearCart = () => {
//     setCart([]);
//     localStorage.removeItem(CART_STORAGE_KEY);
//   };

//   const favoriteItems = isAuth ? user?.favorites || [] : localFavorites;

//   const toggleFavorite = async (product) => {
//     if (!product || !product._id) {
//       console.error("❌ Invalid product provided to toggleFavorite:", product);
//       return;
//     }

//     if (isAuth) {
//       try {
//         const response = await toggleFavoriteService(product._id);

//         if (response?.success && Array.isArray(response.favorites)) {
//           setUser((prev) => ({
//             ...prev,
//             favorites: response.favorites,
//           }));
//         } else {
//           console.error("❌ toggleFavorite: Unexpected response:", response);
//         }
//       } catch (error) {
//         console.error("❌ Failed to toggle favorite:", error);
//       }
//     } else {
//       setLocalFavorites((prevFavorites) => {
//         const isAlreadyFavorite = prevFavorites.some(
//           (fav) => fav._id === product._id
//         );
//         const updatedFavorites = isAlreadyFavorite
//           ? prevFavorites.filter((fav) => fav._id !== product._id)
//           : [...prevFavorites, product];
//         localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//         return updatedFavorites;
//       });
//     }
//   };

//   const value = {
//     cart,
//     products,
//     addToCart,
//     decreaseQuantity,
//     removeFromCart,
//     clearCart,
//     totalProducts,
//     totalPrice,
//     favoriteItems,
//     toggleFavorite,
//     getAllProducts,
//     isLoading,
//   };

//   return (
//     <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
//   );
// }

// export default GlobalProvider;
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { toggleFavorite as toggleFavoriteService } from "../services/favoriteService";

export const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const { isAuth, user, setUser } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [localFavorites, setLocalFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const CART_STORAGE_KEY = "cart";
  const CART_EXPIRATION_DAYS = 1;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    if (storedCart) {
      const age = Date.now() - storedCart.createdAt;
      const maxAge = CART_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
      if (age < maxAge) {
        setCart(storedCart.items);
      } else {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    const cartData = {
      items: cart,
      createdAt: Date.now(),
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalCost = cart.reduce(
      (acc, item) => acc + item.quantity * item.product_price,
      0
    );
    setTotalProducts(totalItems);
    setTotalPrice(totalCost);
  }, [cart]);

  async function getAllProducts(retries = 3, delay = 1500) {
    let attempt = 0;
    while (attempt < retries) {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products/getAllProducts`,
          { withCredentials: true }
        );
        setProducts(data.data);
        return;
      } catch (error) {
        attempt++;
        console.warn(`\u274C Attempt ${attempt} failed:`, error.message);
        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      } finally {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const existing = newCart.find((item) => item._id === product._id);
      if (existing) {
        existing.quantity++;
      } else {
        newCart.push({ ...product, quantity: 1 });
      }
      return newCart;
    });
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const favoriteItems = isAuth ? user?.favorites || [] : localFavorites;

  const toggleFavorite = async (product) => {
    if (!product || !product._id) {
      console.error(
        "\u274C Invalid product provided to toggleFavorite:",
        product
      );
      return;
    }

    if (isAuth) {
      try {
        const response = await toggleFavoriteService(product._id);

        if (response?.success && Array.isArray(response.favorites)) {
          setUser((prev) => ({
            ...prev,
            favorites: response.favorites,
          }));
        } else {
          console.error(
            "\u274C toggleFavorite: Unexpected response:",
            response
          );
        }
      } catch (error) {
        console.error("\u274C Failed to toggle favorite:", error);
      }
    } else {
      setLocalFavorites((prevFavorites) => {
        const isAlreadyFavorite = prevFavorites.some(
          (fav) => fav._id === product._id
        );
        const updatedFavorites = isAlreadyFavorite
          ? prevFavorites.filter((fav) => fav._id !== product._id)
          : [...prevFavorites, product];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      });
    }
  };

  const value = {
    cart,
    products,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalProducts,
    totalPrice,
    favoriteItems,
    toggleFavorite,
    getAllProducts,
    isLoading,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GlobalProvider;
