import React, { useState } from "react";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const SignupScreen = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const { notifyToast } = useContext(AppContext);

  const signupHandler = async () => {
    if (
      mail.trim().length !== 0 &&
      password.trim().length !== 0 &&
      name.trim().length !== 0
    ) {
      try {
        const response = await axios.post("/api/register", {
          name: name,
          email: mail,
          password: password,
        });

        console.log("User = ", response);

        navigate("/login");
      } catch (e) {
        notifyToast("Please check the input values", "danger");
      }
    } else {
      notifyToast("Please check the input values", "danger");
    }
  };

  return (
    <div className="w-full flex-1 bg-white dark:bg-dark-grey flex items-center justify-center px-4 sm:px-10 py-4 sm:py-6">
      <div className="flex flex-col gap-2 w-full sm:w-3/5 sm:max-w-[30rem] text-center">
        <p className="text-3xl font-semibold text-black dark:text-white mb-4">
          Login
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="nameInp"
          id="nameInp"
          placeholder="Enter your name"
          required
          className="inputStyle"
        />
        <input
          type="email"
          name="mailInp"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          id="mailInp"
          placeholder="Enter your mail"
          required
          className="inputStyle"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="passInp"
          id="passInp"
          placeholder="Your password"
          required
          className="inputStyle"
        />

        <Button
          text={"Register"}
          styles={"mt-4"}
          darkBg="#bc00dd"
          darkText="white"
          onClick={signupHandler}
        />

        <p className="font-medium text-base themeText">
          If already registered, then go to{" "}
          <Link className="font-bold cursor-pointer" to={"/login"}>
            login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupScreen;
