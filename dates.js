  let users = JSON.parse(localStorage.getItem("users")) || [];
  let editIndex = null;

  const form = document.getElementById("userForm");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const userlist = document.getElementById("userlist");

  function showUsers() {
    userlist.innerHTML = "";
    users.forEach((u, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${u.username}</td>
        <td>${u.email}</td>
        <td>
          <button onclick="editUser(${index})">Edit</button>
          <button onclick="deleteUser(${index})">Delete</button>
        </td>
      `;
      userlist.appendChild(row);
    });
  }

  window.editUser = function(index) {
    username.value = users[index].username;
    email.value = users[index].email;
    editIndex = index;
  }

  window.deleteUser = function(index) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    showUsers();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newUser = { username: username.value, email: email.value };

    if (editIndex === null) {
      users.push(newUser);
    } else {
      users[editIndex] = newUser;
      editIndex = null;
    }

    localStorage.setItem("users", JSON.stringify(users));
    form.reset();
    showUsers();
  });

  showUsers();
