import baseURL from "../../config/baseURL";

async function getAuthorList(): Promise<any> {
  const response = await fetch(`${baseURL}/api/book/autherlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  return responseData;
}

export default getAuthorList;