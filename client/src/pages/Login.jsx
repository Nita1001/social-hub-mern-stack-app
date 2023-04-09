import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="form-container">
            <LoginForm />
            <Link to="/register">Not registered?</Link>
        </div>
    );
};

export default Login;
