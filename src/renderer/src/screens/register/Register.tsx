"use client";

import type React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import Card from "../../components/card/Card";
import H1 from "../../components/h1/H1";
import InputBox from "../../components/inputBox/InputBox";
import { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import LinkButton from "../../components/linkButton/LinkButton";
import Spinner from "../../components/spinner/Spinner";
import { registerUser } from "../../actions/authAction";

const defaultRegisterData = {
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
};

function Register() {
  const [registerData, setRegisterData] = useState(defaultRegisterData);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstSubmit, setIsFirstSubmit] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const registerDataInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(
    function validateOnInputChange() {
      if (isFirstSubmit) {
        validateInput(registerData);
      }
    },
    [registerData]
  );

  const validateInput = (registerData: typeof defaultRegisterData) => {
    const newErrors = {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (registerData.name === "") {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (registerData.username === "") {
      newErrors.username = "Username is required";
      isValid = false;
    }
    if (registerData.password === "") {
      newErrors.password = "Password is required";
      isValid = false;
    }
    if (registerData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    if (registerData.confirmPassword === "") {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    }
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const registerHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isFirstSubmit) {
      setIsFirstSubmit(true);
    }
    setIsLoading(true);
    setError("");

    if (!validateInput(registerData)) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await registerUser(registerData);
      if (response) {
        alert("Registration successful");
        navigate("/login");
      } else {
        setError("Username already exists");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <H1>Register</H1>
        <form className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          <InputBox
            label="Name"
            type="text"
            name="name"
            value={registerData.name}
            inputHandler={registerDataInputHandler}
            error={errors.name} // Pass error message to InputBox
          />
          <InputBox
            label="Username"
            type="text"
            name="username"
            value={registerData.username}
            inputHandler={registerDataInputHandler}
            error={errors.username} // Pass error message to InputBox
          />
          <InputBox
            label="Password"
            type="password"
            name="password"
            value={registerData.password}
            inputHandler={registerDataInputHandler}
            error={errors.password} // Pass error message to InputBox
          />
          <InputBox
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={registerData.confirmPassword}
            inputHandler={registerDataInputHandler}
            error={errors.confirmPassword} // Pass error message to InputBox
          />

          <Button
            disabled={isLoading}
            onClick={registerHandler}
            className={styles.button}>
            Register
          </Button>
        </form>
        <p className={styles.signup}>
          Already have an account?{" "}
          <LinkButton to="/login" size="sm">
            Login
          </LinkButton>
        </p>
      </Card>
      {isLoading && <Spinner text="Registering..." />}
    </>
  );
}

export default Register;
