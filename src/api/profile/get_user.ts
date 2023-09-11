import baseURL from "../../config/baseURL";

async function getUser(): Promise<any> {
  const response = await fetch(`${baseURL}/api/user/getUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: "64f6f556104f2b6525e78793" }),
  });
  const responseData = await response.json();
  return responseData;
}

export default getUser;
