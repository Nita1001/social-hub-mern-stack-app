import React, { useContext } from "react";
import "./styles/Form.style.css";
import { LoginContext } from "../contexts/LoginContext";
import { register } from "../api/userServices";

const Form = ({ type }) => {
    const { login } = useContext(LoginContext);

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        login(email, password);
    };

    const handleSubmitRegister = async (event) => {
        event.preventDefault();
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const username = document.getElementById("username").value;
        const phone = document.getElementById("phone").value;
        const location = document.getElementById("location").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        register(
            firstName,
            lastName,
            username,
            phone,
            location,
            email,
            password
        );
    };

    return (
        <div className="container">
            <form>
                {type === "register" && (
                    <>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="First Name"
                        />
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Last Name"
                        />
                        <input
                            type="text"
                            id="username"
                            placeholder="username"
                        />
                        <input type="number" id="phone" placeholder="Phone" />
                        <input
                            type="text"
                            id="location"
                            placeholder="Location"
                        />
                    </>
                )}
                <input type="email" id="email" placeholder="email" />
                <input type="text" id="password" placeholder="Password" />
                <button
                    type="submit"
                    id="login-btn"
                    onClick={
                        type === "register"
                            ? handleSubmitRegister
                            : handleSubmitLogin
                    }
                >
                    {type === "register" ? "Register" : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Form;
