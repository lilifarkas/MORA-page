import { useState, useEffect } from 'react';
import URL from '../Constants/ConstantUrl'

function useFetchDates() {
    const [dates, setDates] = useState("");
    const url = `${URL}dates`;

    useEffect(() => {
        async function getDates() {
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

        getDates().then(result => {
            setDates(result);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    return dates;
}

export default useFetchDates;