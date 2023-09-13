import baseURL from "../../config/baseURL";

async function getPriceBook(start:Number,end:Number): Promise<any> {
    const response = await fetch(`${baseURL}/api/book/pricebook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          starting_Price: start,
          ending_Price: end,
        }),
      });
      const responseData = await response.json();
        return responseData;
}

export default getPriceBook;