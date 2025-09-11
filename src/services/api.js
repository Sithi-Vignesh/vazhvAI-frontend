const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/auth";

function getAuthHeaders() {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function getAuthProfile() {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return await res.json();
}

export async function createAuthProfile(payload) {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return await res.json();
}

export async function updateAuthProfile(payload) {
  const res = await fetch(`${BASE_URL}/update`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return await res.json();
}

export async function changeUserRole(role) {
  const res = await fetch(`${BASE_URL}/role`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ role }),
  });
  return await res.json();
}

export const apiService = {
  getAuthProfile,
  createAuthProfile,
  updateAuthProfile,
  changeUserRole,
};
