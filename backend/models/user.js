const users = [];

export function addUser(user) {
  users.push(user);
}

export function findUserByEmail(email) {
  return users.find((u) => u.email === email);
}

export function findUserById(id) {
  return users.find((u) => u.id === id);
}

export function validateUser(email, password) {
  return users.find((u) => u.email === email && u.password === password);
}
