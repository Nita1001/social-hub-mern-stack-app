import { useState } from 'react'

const useFormInputs = (initialValues) => {

    const [values, setValues] = useState(initialValues);

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log('name', name);
        console.log('value', value)
        setValues((preValues) => (
            {
                ...preValues,
                [name]: value
            }))
    };
    return [values, handleChange];
}

export default useFormInputs;