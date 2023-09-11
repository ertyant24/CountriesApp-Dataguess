import React from 'react'
import { useQuery } from '@apollo/client';
import QueryCountries from '../schemas/Countries';

function GetCountries() {

    const GET_COUNTRİES = QueryCountries();

    const displayCountries = () => {
        const { loading, error, data } = useQuery(GET_COUNTRİES);

        if (loading) return <div className="spinner-border" role="status">
            <span className="visually-hidden mt-2">Loading...</span>
        </div>;
        if (error) return <p>Error : {error.message}</p>;

        return data.countries.map(({ code, name, emoji, native }) => (
            <div key={code}>
                <h3>{code}</h3>
                <h4>{name}</h4>
                <p>{emoji}</p>
                <p>{native}</p>
                <br />
            </div>
        ));
    }
    return displayCountries();
}

export default GetCountries
