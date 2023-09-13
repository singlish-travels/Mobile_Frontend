import baseURL from "../../config/baseURL";

async function getGenreBook(genre: string): Promise<any> {
  const response = await fetch(`${baseURL}/api/book/genrebook`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      genre: genre,
    }),
  });
  const responseData = await response.json();
  return responseData;
}

export default getGenreBook;