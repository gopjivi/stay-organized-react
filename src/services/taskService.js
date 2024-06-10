export function addNewTask(todo) {
  return fetch("http://localhost:8083/api/todos", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })

    .catch((err) => {
      // If the POST returns an error, display a message
      console.log(err);
    });
}

export function getTaskByUser(userID) {
  const apiUrl = "http://localhost:8083/api/todos/byuser/" + userID;

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })

    .catch((err) => {
      // If the POST returns an error, display a message
      console.log(err);
    });
}

//get task by task id
export function Gettaskbyid(id) {
  const apiUrl = "http://localhost:8083/api/todos/" + id;

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })

    .catch((err) => {
      // If the POST returns an error, display a message
      console.log(err);
    });
}

export function updateTaskbyID(todo) {
  return fetch("http://localhost:8083/api/todos/" + todo.id, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })

    .catch((err) => {
      // If the POST returns an error, display a message
      console.log(err);
    });
}

export function deleteTaskbyID(id) {
  return fetch("http://localhost:8083/api/todos/" + id, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })

    .catch((err) => {
      // If the POST returns an error, display a message
      console.log(err);
    });
}
