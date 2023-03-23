import { useEffect, useState } from "react";

const useToken = email => {

    const [loading, setLoading] = useState();

    const [token, setToken] = useState('')

    useEffect(() => {
      setLoading(true)
        if (email) {
          
            fetch(`http://localhost:5000/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        localStorage.setItem('accessToken', data.accessToken);
                        setToken(data.accessToken);
                        setLoading(false)
                    }
                });
        }
    }, [email])
    return [token];
}

export default useToken;