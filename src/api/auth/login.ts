// apiService.ts
import baseURL from "../../config/baseURL";

async function loginPublisher(loginData: any): Promise<any> {
    const response = await fetch(`${baseURL}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    return responseData;
 
}

export default loginPublisher;
