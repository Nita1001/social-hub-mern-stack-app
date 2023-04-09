import { useState } from 'react'

const useInput = (initialValues) => {

    const [values, setValues] = useState(initialValues);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((preValues) => (
            {
                ...preValues,
                [name]: value
            }))
    };
    return [values, handleChange];
}

export default useInput;