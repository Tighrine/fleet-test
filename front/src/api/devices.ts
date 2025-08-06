const API = 'http://localhost:3000/api/devices';

export const getDevices = async () => {
  const response = await fetch(API);
  if (!response.ok) throw new Error('Network response was not ok, status: ' + response.status);
  return response.json();
}

export const getDeviceById = async (id: number) => {
  const response = await fetch(`${API}/${id}`);
  if (!response.ok) throw new Error('Network response was not ok, status: ' + response.status);
  return response.json();
}

export const createDevice = async (data: { name: string; type: string }) => {
  const response = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export const updateDevice = async (id: number, data: { name: string; type: string }) => {
  const response = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export const deleteDevice = async (id: number) => {
  const response = await fetch(`${API}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}