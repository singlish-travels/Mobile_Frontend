import baseURL from "../../config/baseURL";

async function removeWord(id: string): Promise<any> {
  const response = fetch("http://10.10.12.7:3001/api/dictionary/remove", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: id }),
  });
}

export default removeWord;
