const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getProduct = async (id) => {
  try {
    const url = `${API_URL}/products/${id}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching productId:', error);
    throw error; // Re-throw to allow caller to handle if needed
  }
};

export default getProduct;

