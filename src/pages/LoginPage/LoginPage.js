import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clayful from "clayful/client-js";
import { AuthContext } from "../../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated } = useContext(AuthContext);

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

    Customer.authenticate(payload, function (err, result) {
      if (err) {
        console.log(err.code);
        return;
      }
      const data = result.data;
      console.log(data);
      localStorage.setItem("customerUid", data.customer);
      localStorage.setItem("accessToken", data.token);
      navigate('/');
      isAuthenticated();
    });
  };

  return (
    <div className="auth-wrapper">
      <h1>로그인.</h1>
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
        <p>
          Apple ID는 iTunes, App Store, iCloud에 로그인할 때 사용하는 이메일
          주소입니다.
        </p>
        <button type="submit">로그인.</button>
        <Link to="register" style={{ color: "gray", textDecoration: "none" }}>
          {" "}
          Apple ID가 없으신가요? 지금 생성.
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
