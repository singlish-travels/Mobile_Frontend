import baseURL from "../../config/baseURL";

async function checkbookforuser(send_data: any): Promise<any> {
  const response = await fetch(`${baseURL}/api/cart/checkbookforuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(send_data),
  });
  const responseData = await response.json();
  return responseData;
}

export default checkbookforuser;