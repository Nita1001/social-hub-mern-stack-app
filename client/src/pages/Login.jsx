import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import "./styles/Login.style.css";

const Login = () => {
    return (
        <div className="login-page-container">
            <LoginForm />
            <Link to="/register">Not registered?</Link>
        </div>
    );
};

export default Login;
