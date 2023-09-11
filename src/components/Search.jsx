import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import QueryCountries from '../schemas/Countries';
import '../App.css'

function Search() {

    const GET_COUNTRIES = QueryCountries();

    // STATES
    const [searchText, setSearchText] = useState("");
    const [filterData, setFilterData] = useState([]);

    const { loading, error, data } = useQuery(GET_COUNTRIES);

    if (loading) return <div className="spinner-border" role="status">
        <span className="visually-hidden mt-2">Loading...</span>
    </div>
    if (error) return <p>Error Message: {error.message}</p>

    const searchChange = (event) => {
        setSearchText(event.target.value);
    };

    const search = () => {
        const lowerCaseText = searchText.toLowerCase();
        const filteredCountries = data.countries.filter((country) => country.name.toLowerCase().includes(lowerCaseText));
        console.log(filteredCountries);
        setFilterData(filteredCountries);
    }

    return (
        <>
            <div className="container mt-5 pe-5">
                <div className="row">
                    <div className="col-6 offset-3">
                        <div className="mb-3 ps-4">
                            <label htmlFor="search" className='form-label fw-semibold'>Country Name</label>
                            <div className='d-flex text-center'>
                                <input
                                    type="text"
                                    placeholder="Ara..."
                                    value={searchText}
                                    onChange={searchChange}
                                    className='me-3 form-control'
                                    id='search'
                                    name='search'
                                />
                                <button onClick={search} className='btn btn-primary'>Ara</button>
                            </div>

                            <div className="mt-5 d-flex flex-wrap justify-content-center">
                                {filterData.map((country) => (
                                    <div key={country.code}>
                                        <div className='country mt-4'>
                                            <h2 className='mb-3 text-center'>{country.code}
                                           </h2><hr />
                                            <p><span className='fw-semibold'>Name:</span> {country.name} - <span>{country.emoji}</span></p>
                                            <p><span className='fw-semibold'>Phone:</span> {country.phone}</p>
                                            <p><span className='fw-semibold'>Currency:</span> {country.currency}</p>
                                            <p><span className='fw-semibold'>Native:</span> {country.native}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search
