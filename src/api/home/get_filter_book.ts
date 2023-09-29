import baseURL from "../../config/baseURL";

async function getFilterBook(
  starting_Price: number,
  ending_Price: number,
  genre: string,
  author: string
): Promise<any> {
  const response = await fetch(
    `${baseURL}/api/book/getbookbyauthorgenreandprice`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        starting_Price: starting_Price,
        ending_Price: ending_Price,
        genre: genre,
        author: author,
      }),
    }
  );
  const responseData = await response.json();
  return responseData;
}

export default getFilterBook;
