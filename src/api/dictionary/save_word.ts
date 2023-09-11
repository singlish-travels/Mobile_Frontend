import baseURL from "../../config/baseURL";

async function saveWord(dictionaryData:any): Promise<any> {
  const response = await fetch(
    `${baseURL}/api/dictionary/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dictionaryData),
    }
  );
  const responseData = await response.json();
  return responseData;
}

export default saveWord;
