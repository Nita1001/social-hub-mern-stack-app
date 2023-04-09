import { useState, useContext } from 'react'
import { register } from "../api/userServices";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import useFormInputs from './useFormInputs';
import { validateLogin, validateRegister } from '../utils/validateFormInput';

const useForm = (type) => {

    const initialValues = {
        firstName: '',
        lastName: '',
        username: '',
        phone: '',
        location: '',
        email: '',
        password: ''
    }

    const [values, handleChange] = useFormInputs(initialValues);
    const [errors, setErrors] = useState({});
    const { login } = useContext(LoginContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const { email, password } = values;
        const response = await login(email, password);
        if (response.error) {
            setErrors({ loginError: response.error });;
        } else {
            navigate("/profile");
        }
    };

    const handleRegistration = async () => {
        const { firstName, lastName, username, phone, location, email, password } = values;
        register(firstName, lastName, username, phone, location, email, password);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        switch (type) {
            case 'register':
                console.log(errors)
                const registerErrors = validateRegister(values);
                setErrors(registerErrors);
                const noRegErrors = Object.keys(registerErrors).length === 0;
                if (noRegErrors) {
                    handleRegistration()
                } else {
                    console.log(noRegErrors)
                }
                break;
            case 'login':
                const loginErrors = validateLogin(values);
                setErrors(loginErrors);
                const noLoginErrors = Object.keys(loginErrors).length === 0;
                if (noLoginErrors) {
                    handleLogin();
                } else {
                    console.log(noLoginErrors)
                }
        }
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit
    };
};

export default useForm;