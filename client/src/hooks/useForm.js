import { useState, useContext } from 'react'
import { register } from "../api/userServices";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import useFormInputs from './useFormInputs';
import { validateLogin, validateRegister } from '../utils/validateFormInput';
import useSpinner from "../hooks/useSpinner";

const useForm = (type) => {
    const { isLoading, setIsLoading } = useSpinner();

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
            setIsLoading(false);
            navigate("/profile");
        }
    };

    const handleRegistration = async () => {
        const { firstName, lastName, username, phone, location, email, password } = values;
        console.log('VALUES', values)
        register(firstName, lastName, username, phone, location, email, password);
        setIsLoading(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        console.log('type', type)
        switch (type) {
            case 'register':
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
                    console.log('11111111111111111')
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
        handleSubmit,
        isLoading
    };
};

export default useForm;