import axios from "axios";

const API_URL = "http://localhost:3000/users/favorites";

export async function toggleFavorite(productId) {
  try {
    const { data } = await axios.post(
      `${API_URL}/toggle`,
      { productId },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.error("❌ toggleFavorite API error:", error);
    throw error;
  }
}

export async function mergeFavorites(localFavorites) {
  try {
    const { data } = await axios.post(
      `${API_URL}/merge`,
      { localFavorites },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.error("❌ mergeFavorites API error:", error);
    throw error;
  }
}
