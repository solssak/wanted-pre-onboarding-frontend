import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const BASE_URL = "https://www.pre-onboarding-selection-task.shop";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidate, setEmailValidate] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");

  const emailValidateHandler = (e) => {
    setEmail(e.target.value);
    setEmailValidate(e.target.value.includes("@"));
  };

  const passwordValidateHandler = (e) => {
    setPassword(e.target.value);
    setPasswordValidate(e.target.value.length >= 8);
  };

  useEffect(() => {
    const isToken = localStorage.getItem("access_token");
    if (isToken) {
      navigate("/todo", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signUpHandler = (e) => {
    e.preventDefault();
    if (emailValidate && passwordValidate) {
      fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("회원가입 성공!");
          navigate("/signin");
        }
      });
    }
  };

  return (
    <div className="App">
      <h1>회원가입</h1>
      <form className="form" onSubmit={signUpHandler}>
        <label className="label">
          이메일
          <input
            data-testid="email-input"
            onChange={emailValidateHandler}
            required
          />
          비밀번호
          <input
            data-testid="password-input"
            type="password"
            onChange={passwordValidateHandler}
            required
          />
          <button
            data-testid="signup-button"
            type="submit"
            disabled={!emailValidate || !passwordValidate}
          >
            회원가입
          </button>
        </label>
      </form>
    </div>
  );
};

export default SignUp;
