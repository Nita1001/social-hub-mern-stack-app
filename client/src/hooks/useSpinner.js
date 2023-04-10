import { useState } from 'react'

const useSpinner = () => {
    const [isLoading, setIsLoading] = useState(false);

    return { isLoading, setIsLoading };
}

export default useSpinner