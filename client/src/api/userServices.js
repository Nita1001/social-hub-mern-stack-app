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

    }
}

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post("/api/users/login", {
            email: email.toString(),
            password: password.toString(),
        });
        console.log('response', response);
        return response;
    } catch (error) {
        console.error(error);
    }
};