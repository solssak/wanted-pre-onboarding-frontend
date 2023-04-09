import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const BASE_URL = "https://www.pre-onboarding-selection-task.shop";

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailValidate, setEmailValidate] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");

  const emailInputHandler = (e) => {
    setEmailInput(e.target.value);
    setEmailValidate(e.target.value.includes("@"));
  };

  const passwordInputHandler = (e) => {
    setPasswordInput(e.target.value);
    setPasswordValidate(e.target.value.length >= 8);
  };

  useEffect(() => {
    const isToken = localStorage.getItem("access_token");
    if (isToken) {
      navigate("/todo", { replace: true });
    }
  }, []);

  const signInHandler = (e) => {
    e.preventDefault();
    fetch(`${BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((value) => {
        const token = value.access_token;
        localStorage.setItem("access_token", token);
        navigate("/todo");
      });
  };
  return (
    <div className="App">
      <h1>로그인</h1>
      <form className="form" onSubmit={signInHandler}>
        <label className="label">
          이메일
          <input
            className="input"
            data-testid="email-input"
            onChange={emailInputHandler}
            required
          />
          비밀번호
          <input
            className="input"
            data-testid="password-input"
            type="password"
            onChange={passwordInputHandler}
            required
          />
          <button
            data-testid="signin-button"
            type="submit"
            disabled={!emailValidate || !passwordValidate}
          >
            로그인
          </button>
        </label>
      </form>
    </div>
  );
};

export default SignIn;
