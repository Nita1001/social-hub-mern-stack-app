import React, { useContext } from "react";
import "./styles/Form.style.css";
import { LoginContext } from "../contexts/LoginContext";

const Form = ({ type }) => {
    const { login } = useContext(LoginContext);

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        login(email, password);
    };
    return (
        <div className="container">
            <form>
                {type === "register" && (
                    <>
                        <input type="text" id="name" placeholder="First Name" />
                        <input type="text" id="name" placeholder="Last Name" />
                        <input type="text" id="name" placeholder="username" />
                    </>
                )}
                <input type="email" id="email" placeholder="email" />
                <input type="text" id="password" placeholder="Password" />
                <button
                    type="submit"
                    id="login-btn"
                    onClick={handleSubmitLogin}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Form;
