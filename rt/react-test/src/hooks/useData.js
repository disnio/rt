import { useState, useReducer, useEffect } from 'react';
import axios from 'axios';

const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_init':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case 'fetch_success':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'fetch_failure':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
};

export function useDataApi(initialUrl, initialData) {
    const [url, setUrl] = useState(initialUrl);
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: 'fetch_init' });

            try {
                const result = await axios(url);

                if (!didCancel) {
                    dispatch({ type: 'fetch_success', payload: result.data });
                }
            } catch (e) {
                if (!dispatch) {
                    dispatch({ type: 'fetch_failure' });
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [url]);

    return [state, setUrl];
}
