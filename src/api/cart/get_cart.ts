import baseURL from "../../config/baseURL";

async function getCart(id: string): Promise<any> {
  const response = await fetch(`${baseURL}/api/cart/getcart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: id }),
  });
  const responseData = await response.json();
  return responseData;
}

export default getCart;
