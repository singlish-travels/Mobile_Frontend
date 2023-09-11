import baseURL from "../../config/baseURL";

async function updateUser(updateData: any): Promise<any> {
  const response = await fetch(`${baseURL}/api/user/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
}

export default updateUser;
