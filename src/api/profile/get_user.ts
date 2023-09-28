import baseURL from "../../config/baseURL";

async function getUser(id: string): Promise<any> {
  const response = await fetch(`${baseURL}/api/user/getUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
  const responseData = await response.json();
  return responseData;
}

export default getUser;
