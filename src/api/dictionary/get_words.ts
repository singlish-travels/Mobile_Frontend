import baseURL from "../../config/baseURL";

async function getWords(): Promise<any> {
    const response = await fetch(
        `${baseURL}/api/dictionary/get`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: "64f6f556104f2b6525e78793" }),
        }
      );
      const responseData = await response.json();
        return responseData;
}

export default getWords;