const BASE_URL = "https://localhost:7073";

export async function getUsers(params) {
  const url =
    `${BASE_URL}/api/users/?` + new URLSearchParams(params).toString();

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get users.");
  }

  return data;
}
