import { useState, useEffect } from 'react';
import URL from '../Constants/ConstantUrl'

function useFetchUser() {
    const [user, setUser] = useState("");
    const url = `${URL}get-user`;

    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(result)
                    return result;
                } else {
                    const errorResponse = await response.json();
                    alert(errorResponse)
                    console.log(errorResponse);
                    return null;
                }
            } catch (error) {
                console.error(error);
            }
        }

        getUser().then(result => {
            setUser(result);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    return user;
}

export default useFetchUser;