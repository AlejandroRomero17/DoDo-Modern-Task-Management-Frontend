interface User {
  firstName?: string;
  lastName?: string;
  username?: string;
  token?: string; 
}

export function getUserDetails(): User | null {
  const user = localStorage.getItem("toDoAppUser");
  return user ? JSON.parse(user) : null;
}

export function isLoggedIn(): boolean {
  const user = getUserDetails();
  return !!user?.token;
}
