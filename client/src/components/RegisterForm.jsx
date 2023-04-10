import React from "react";
import useForm from "../hooks/useForm";
import "./styles/Form.style.css";

const RegisterForm = () => {
    const { errors, handleChange, handleSubmit } = useForm("register");

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                {errors.firstName && <span>{errors.firstName}</span>}
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                />
                {errors.lastName && <span>{errors.lastName}</span>}
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                />
                {errors.username && <span>{errors.username}</span>}
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={handleChange}
                />
                {errors.phone && <span>{errors.phone}</span>}
                <input
                    type="number"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                />
                {errors.location && <span>{errors.location}</span>}
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                />
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
                <button type="submit" id="login-btn">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
