import type { Device } from "../shapes/device";

const API = 'http://localhost:3000/api/devices';

export const getDevices = async () => {
  const response = await fetch(API);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Network response was not ok: ${error.message}, status: ${response.status}`);
  }
  return response.json();
}

export const getDeviceById = async (id: number) => {
  const response = await fetch(`${API}/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Network response was not ok: ${error.message}, status: ${response.status}`);
  }
  return response.json();
}

export const createDevice = async (data: Device & { ownerId?: string | null }) => {
  const response = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Network response was not ok: ${error.message}, status: ${response.status}`);
  }
  return response.json();
}

export const updateDevice = async (id: string, data: Device & { ownerId?: string | null }) => {
  const response = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Network response was not ok: ${error.message}, status: ${response.status}`);
  }
  return response.json();
}

export const deleteDevice = async (id: string) => {
  const response = await fetch(`${API}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Network response was not ok: ${error.message}, status: ${response.status}`);
  }
  return true; // Assuming successful deletion returns true
}