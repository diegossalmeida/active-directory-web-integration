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

export async function getUser(samAccountName) {
  const url = `${BASE_URL}/api/users/${samAccountName}`;

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get users.");
  }

  return data;
}

export async function addUser(user) {
  const url = `${BASE_URL}/api/users`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Could not create the user.", { cause: data });
  }

  return data;
}

export async function updateUser(user) {
  const url = `${BASE_URL}/api/users/${user.samAccountName}`;

  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Could not update the user.", { cause: data });
  }

  return data;
}

export async function deleteUser(user) {
  const url = `${BASE_URL}/api/users/${user.samAccountName}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Could not update the user.", { cause: data });
  }

  return data;
}
