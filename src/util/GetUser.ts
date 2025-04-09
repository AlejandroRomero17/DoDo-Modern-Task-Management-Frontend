interface User {
  firstName?: string;
  lastName?: string;
  username?: string;
}

export function getUserDetails(): User | null {
  const user = localStorage.getItem("toDoAppUser");
  return user ? JSON.parse(user) : null;
}
