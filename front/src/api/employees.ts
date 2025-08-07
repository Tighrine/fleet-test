const API = 'http://localhost:3000/api/employees'

export const getEmployees = async () => {
  const response = await fetch(API);
    if (!response.ok) {
    const error = await response.json();
    throw new Error(`Network response was not ok: ${error.message}, status: ${response.status}`);
  }
  return response.json();
}

export const getEmployeeById = async (id: string) => {
  const response = await fetch(`${API}/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Network response was not ok: ${error.message}, status: ${response.status}`);
  }
  return response.json();
}

export const createEmployee = async (data: { name: string; role: string }) => {
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

export const updateEmployee = async (id: string, data: { name: string; role: string }) => {
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

export const deleteEmployee = async (id: string) => {
  const response = await fetch(`${API}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Network response was not ok: ${error.message}, status: ${response.status}`);
  }
  return response.json();
}
