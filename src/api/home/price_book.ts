import baseURL from "../../config/baseURL";

async function getPriceBook(): Promise<any> {
    const response = await fetch(`${baseURL}/api/book/pricebook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          starting_Price: 0,
          ending_Price: 10000,
        }),
      });
      const responseData = await response.json();
        return responseData;
}

export default getPriceBook;