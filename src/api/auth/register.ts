import baseURL from "../../config/baseURL";

async function registerPublisher(registerData: any): Promise<any> {
    const response = await fetch(
        `${baseURL}/api/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        }
      );

      const responseData = await response.json();

    return responseData;
}

export default registerPublisher;
