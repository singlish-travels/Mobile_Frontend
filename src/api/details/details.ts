import baseURL from "../../config/baseURL";

async function details(id: string):Promise<string>{
    const response=await fetch(`${baseURL}/api/book/show`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        id:id
      })
    })
    const data=await response.json();

    return data;
}

export default details;