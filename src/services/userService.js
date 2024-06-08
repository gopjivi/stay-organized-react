export async function createNewuser(user) {
  return fetch("http://localhost:8083/api/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}

export function checkUserName(name) {
  return fetch(`http://localhost:8083/api/username_available/${name}`, {
    method: "GET",
    credentials: "same-origin",
  }).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}

export function validateUserByName(name) {
  return fetch(`http://localhost:8083/api/users/${name}`, {
    method: "GET",
    credentials: "same-origin",
  }).then((res) => {
    return res;
  });
}
