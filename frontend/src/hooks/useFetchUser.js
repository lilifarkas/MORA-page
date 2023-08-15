import { useState, useEffect, useCallback } from 'react';
import URL from '../Constants/ConstantUrl';

function useFetchUser(refetch) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = `${URL}get-user`;

    const fetchUser = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                const result = await response.json();
                setUser(result);
                setError(null);
            } else {
                const errorResponse = await response.json();
                setError(errorResponse);
                setUser(null);
            }
        } catch (error) {
            console.error(error);
            setError(error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser, refetch]); // Listen for changes in the refetch dependency

    const refetchUser = useCallback(() => {
        fetchUser();
    }, [fetchUser]);

    return { user, loading, error, refetchUser };
}

export default useFetchUser;

// import { useState, useEffect } from 'react';
// import URL from '../Constants/ConstantUrl'
//
// function useFetchUser() {
//     const [user, setUser] = useState("");
//     const url = `${URL}get-user`;
//
//     useEffect(() => {
//         async function getUser() {
//             try {
//                 const response = await fetch(url, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     credentials: 'include'
//                 });
//
//                 if (response.ok) {
//                     const result = await response.json();
//                     return result;
//                 } else {
//                     const errorResponse = await response.json();
//                     alert(errorResponse)
//                     console.log(errorResponse);
//                     return null;
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//
//         getUser().then(result => {
//             setUser(result);
//         }).catch(error => {
//             console.error(error);
//         });
//     }, []);
//
//     return user;
// }
//
// export default useFetchUser;