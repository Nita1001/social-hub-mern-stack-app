import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";
const Register = () => {
    return (
        <>
            <RegisterForm />
            <Link to="/register">Already a member?</Link>
        </>
    );
};

export default Register;
