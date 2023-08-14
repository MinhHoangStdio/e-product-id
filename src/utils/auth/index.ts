import history from "../../routes/history";

const getAuth = () => {
  if (!localStorage) {
    return;
  }

  const lsValue = localStorage.getItem("access_token");
  if (!lsValue) {
    return;
  }

  try {
    const auth = JSON.parse(lsValue);
    if (auth) {
      // You can easily check auth_token expiration also
      return auth;
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
};

const handleLogout = () => {
  if (window.location.pathname !== "/login") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("current_user");
    history.replace("/login");
  }
};

export { getAuth, handleLogout };
