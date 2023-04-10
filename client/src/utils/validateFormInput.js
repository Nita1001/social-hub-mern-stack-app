export const validateLogin = (values) => {
    const errors = {};

    if (!values.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is invalid';
    }

    if (!values.password.trim()) {
        errors.password = 'Password is required';
    } else if (values.password.length < 4) {
        errors.password = 'Password must be at least 6 characters';
    }

    return errors;
};

export const validateRegister = (values) => {
    const errors = {};

    if (!values.firstName.trim()) {
        errors.firstName = 'First name is required';
    }

    if (!values.lastName.trim()) {
        errors.lastName = 'Last name is required';
    }

    if (!values.username.trim()) {
        errors.username = 'Username is required';
    }

    if (!values.phone.trim()) {
        errors.phone = "Phone number required";
    } else if (!/^\d{10}$/.test(values.phone.trim())) {
        errors.phone = "Invalid phone number";
    }

    if (!values.location.trim()) {
        errors.location = 'Location is required';
    }

    if (!values.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is invalid';
    }

    if (!values.password.trim()) {
        errors.password = 'Password is required';
    } else if (values.password.length < 4) {
        errors.password = 'Password must be at least 4 characters';
    }

    return errors;
};