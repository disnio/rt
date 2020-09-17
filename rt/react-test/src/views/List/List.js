import React, {
    Fragment,
    // Component,
    // memo,
    useState,
    // useCallback,
    // useEffect,
    // useRef,
    // useReducer,
    // useContext
} from 'react';
import { useDataApi } from '@/hooks/useData';

function App() {
    const [query, setQuery] = useState('redux');
    const [{ data, isLoading, isError }, doFetch] = useDataApi(
        'https://hn.algolia.com/api/v1/search?query=redux',
        {
            hits: [],
        }
    );

    console.log(data);

    return (
        <Fragment>
            <form
                onSubmit={event => {
                    doFetch(
                        `http://hn.algolia.com/api/v1/search?query=${query}`
                    );
                    event.preventDefault();
                }}
            >
                <input
                    type="text"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {isError && <div>Something went wrong ...</div>}
            {isLoading ? (
                <div>Loading....</div>
            ) : (
                data.hits.map(item => (
                    <li key={item.objectId}>
                        <a href={item.url}>{item.title}</a>
                    </li>
                ))
            )}
        </Fragment>
    );
}

export default function List() {
    return (
        <div>
            <App />
        </div>
    );
}
