import baseURL from "../../config/baseURL";

async function deleteBookCart(send_data: any): Promise<any> {
    const response = await fetch(`${baseURL}/api/favorite/delete_book`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(send_data),
    });
    const responseData = await response.json();
    return responseData;
    }

export default deleteBookCart;