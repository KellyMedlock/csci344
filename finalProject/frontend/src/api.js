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
    } catch {
      // Keep the default message if the server does not return JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// TODO: Add your own endpoint functions below.
// Example:
export async function getCharacters() {
  return await sendRequest("/api/characters");
}

// - name: character_name
//   type: string
//   required: true
//   query: true
// - name: class_dnd
//   type: string
//   required: true
// - name: subclass_dnd
//   type: string
// - name: race
//   type: string
//   required: true
// - name: subrace
//   type: string
// - name: background
//   type: string
//   required: true
// - name: level
//   type: integer
//   required: true

const sampleData = {
  character_name: "walter",
  class_dnd: "barbarian",
  race: "human",
  background: "acolyte",
  level: 1,
};

export async function createCharacter(data) {
  const options = {
    method: "POST",
    body: JSON.stringify(data),
  };

  return await sendRequest("/api/characters", options);
}
