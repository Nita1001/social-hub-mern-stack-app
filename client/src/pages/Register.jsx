import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";
import "./styles/Login.style.css";

const Register = () => {
    return (
        <div className="login-page-container">
            <RegisterForm />
            <Link to="/login">Already a member?</Link>
        </div>
    );
};

export default Register;
