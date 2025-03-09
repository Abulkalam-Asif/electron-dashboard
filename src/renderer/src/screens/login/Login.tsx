"use client";

import type React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import Card from "../../components/card/Card";
import H1 from "../../components/h1/H1";
import InputBox from "../../components/inputBox/InputBox";
import { useState, useEffect } from "react";
import Button from "../../components/button/Button";
// import LinkButton from "../../components/linkButton/LinkButton";
import Spinner from "../../components/spinner/Spinner";
import { loginUser } from "../../actions/authAction";

const defaultLoginData = {
  username: "",
  password: "",
};

function Login() {
  const [loginData, setLoginData] = useState(defaultLoginData);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstSubmit, setIsFirstSubmit] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

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
      const response = await loginUser(loginData);
      if (!response) {
        throw new Error("Invalid username or password");
      }
      localStorage.setItem("token", response);
      alert("Login successful");
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
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

        <Button
          disabled={isLoading}
          onClick={loginHandler}
          className={styles.button}>
          Login
        </Button>
      </form>
      {/* <p className={styles.register}>
        Don't have an account?{" "}
        <LinkButton to="/register" size="sm">
          Register
        </LinkButton>
      </p> */}
      {isLoading && <Spinner text="Logging in..." />}
    </Card>
  );
}

export default Login;
