"use client";

import type React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import Card from "../../components/general/card/Card";
import H1 from "../../components/general/h1/H1";
import InputBox from "../../components/general/inputBox/InputBox";
import { useState, useEffect } from "react";
import Button from "../../components/general/button/Button";
import Loader from "../../components/general/loader/Loader";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@renderer/graphql/auth";
import { useAlert } from "@renderer/contexts/AlertContext";

const defaultLoginData = {
  username: "",
  password: "",
};

function Login() {
  const { showAlert } = useAlert();
  const [loginData, setLoginData] = useState(defaultLoginData);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstSubmit, setIsFirstSubmit] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loginUserMutation] = useMutation(LOGIN_USER);

  const loginDataInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(
    function validateOnInputChange() {
      if (isFirstSubmit) {
        validateInput(loginData);
      }
    },
    [loginData]
  );

  const validateInput = (loginData: typeof defaultLoginData) => {
    const newErrors = {
      username: "",
      password: "",
    };
    let isValid = true;

    if (loginData.username === "") {
      newErrors.username = "Username is required";
      isValid = false;
    }
    if (loginData.password === "") {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const loginHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isFirstSubmit) {
      setIsFirstSubmit(true);
    }
    setIsLoading(true);
    setError("");

    if (!validateInput(loginData)) {
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await loginUserMutation({
        variables: {
          username: loginData.username,
          password: loginData.password,
        },
      });
      if (!data || !data.loginUser) {
        throw new Error("Invalid username or password");
      }
      localStorage.setItem("token", data.loginUser);
      showAlert({ message: "Login successful", type: "success" });
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      showAlert({ message: "Login failed", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card cardClassName={styles.card}>
      <H1>Login</H1>
      <form className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        <InputBox
          label="Username"
          type="text"
          name="username"
          value={loginData.username}
          inputHandler={loginDataInputHandler}
          error={errors.username} // Pass error message to InputBox
        />
        <InputBox
          label="Password"
          type="password"
          name="password"
          value={loginData.password}
          inputHandler={loginDataInputHandler}
          error={errors.password} // Pass error message to InputBox
        />

        <Button disabled={isLoading} onClick={loginHandler} className={styles.button}>
          Login
        </Button>
      </form>
      {isLoading && <Loader text="Logging in..." />}
    </Card>
  );
}

export default Login;
