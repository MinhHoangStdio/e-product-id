import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import Login from "./login";
import Register from "./register";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Paper
      sx={{
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "500px",
        borderRadius: "8px",
        padding: "12px",
      }}
    >
      {isLogin ? <Login /> : <Register />}
      <div
        className="
      text-neutral-500 mt-4 font-light"
      >
        <p>
          {isLogin ? "First time using this app?" : "Already have an account?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
            }}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            {isLogin ? "Create an account" : "Login"}
          </span>
        </p>
      </div>
    </Paper>
  );
};

export default AuthPage;
