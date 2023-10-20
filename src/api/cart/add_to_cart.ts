import baseURL from "../../config/baseURL";

async function addToCart(CartData: any): Promise<any> {
  const response = await fetch(`${baseURL}/api/cart/addbook`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(CartData),
  });

  const responseData = await response.json();
  return responseData;
}

export default addToCart;
