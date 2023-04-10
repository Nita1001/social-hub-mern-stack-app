import React from "react";
import useForm from "../hooks/useForm";
import Spinner from "../components/Spinner";

import "./styles/Form.style.css";

const LoginForm = () => {
    const { errors, handleChange, handleSubmit, isLoading } = useForm("login");

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                {errors.email && <span>{errors.email}</span>}
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={handleChange}
                />
                {errors.password && <span>{errors.password}</span>}
                <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                {errors.loginError && <span>{errors.loginError}</span>}

                {isLoading ? (
                    <Spinner />
                ) : (
                    <button type="submit" id="login-btn">
                        Login
                    </button>
                )}
            </form>
        </div>
    );
};

export default LoginForm;
