import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clayful from "clayful/client-js";

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleEmailChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Customer = clayful.Customer;

    const payload = {
      email,
      password,
    };

    Customer.createMe(payload, function (err, result) {
      if (err) {
        console.log(err.code);
        return;
      }
      const data = result.data;
      console.log(data);
      navigate("/login");
    });
  };

  return (
<div className="page-wrapper">
      <div className="auth-wrapper">
        <h1>회원가입.</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Apple Id"
          />
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleEmailChange}
            placeholder="암호"
          />
          <button type="submit">회원가입.</button>
          <Link to="/login" style={{ color: "gray", textDecoration: "none" }}>
            {" "}
            이미 Apple ID가 있다면? 지금 로그인.
          </Link>
        </form>
      </div>
</div>
  );
}

export default RegisterPage;
