import { getToken } from "./tokenStorage.js";

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL;
}

export async function sendRequest(path, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const response = await fetch(getApiBaseUrl() + path, {
    method: options.method,
    body: options.body,
    headers,
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const errorBody = await response.json();
      message = errorBody.error || errorBody.message || message;
    } catch {}
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function getCharacters() {
  return await sendRequest("/api/characters");
}

export async function getCharacterById(characterID) {
  return await sendRequest(`/api/characters/${characterID}`);
}

export async function createCharacter(data) {
  const options = {
    method: "POST",
    body: JSON.stringify(data),
  };

  return await sendRequest("/api/characters", options);
}

export async function deleteCharacter(characterID) {
  const options = {
    method: "DELETE",
  };

  return await sendRequest(`/api/characters/${characterID}`, options);
}

export async function updateCharacter(characterID, updatedCharacter) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCharacter),
  };

  return await sendRequest(`/api/characters/${characterID}`, options);
}
