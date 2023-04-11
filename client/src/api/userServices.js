import axios from "axios";


export const register = async (firstName,
    lastName,
    username,
    phone,
    location,
    email,
    password) => {
    try {
        const response = await axios.post('/api/users', {
            firstName,
            lastName,
            username,
            phone,
            location,
            email,
            password
        })
        console.log('response', response);
        return response;
    } catch (error) {
        console.error(error);
        return { error: 'Server Error' };;
    }
}

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post("/api/users/login", {
            email: email.toString(),
            password: password.toString(),
        });
        console.log('response', response);
        return response.data;
    } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
            return { error: 'Invalid email or password' };
        } else {
            return { error: 'Server Error' };;
        }
    }
};

export const getUsers = async () => {
    try {
        const response = await axios.get('/api/users');
        return response.data;
    } catch (error) {
        console.error(error);
        return { error: 'Server Error' };
    }
};