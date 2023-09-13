import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import QueryCountries from '../schemas/Countries';
import '../App.css'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

function Search() {

    const GET_COUNTRIES = QueryCountries();

    // STATES
    const [searchText, setSearchText] = useState("");
    const [filterData, setFilterData] = useState([]);
    const [selectedDiv, setSelectedDiv] = useState(null);

    const colors = ["red", "yellow", "pink", "purple", "grey", "orange", "brown", "gold", "green"];

    const { loading, error, data } = useQuery(GET_COUNTRIES);

    if (loading) return <div className="spinner-border" role="status">
        <span className="visually-hidden mt-2">Loading...</span>
    </div>
    if (error) return <p>Error Message: {error.message}</p>

    const changeBackgroundColor = (index) => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        setSelectedDiv({ index, color: randomColor})
    }

    const deleteDiv = (code) => {
        window.confirm(`Are you sure deleted this country - ${code}`)
        setFilterData(() => filterData.filter((country) => country.code !== code));
        // console.log(prevData);
    }

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
            <div className="container mt-5">
                <div className="row">
                    <div className="col-6 offset-3">
                        <div className="mb-3">
                            <label htmlFor="search" className='form-label fw-semibold'>Country Name</label>
                            <div className='d-flex'>
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
                                {filterData.map((country, index, x) => (
                                    <div key={country.code} >
                                        <div className='country mt-4' style={{ backgroundColor: selectedDiv?.index === index ? selectedDiv.color : "white", cursor: "pointer"}} onClick={() => changeBackgroundColor(index)}>
                                            <div className='d-flex justify-content-between mb-4'>
                                                <h2 className=''>{country.code}
                                                </h2>
                                                <span className=''><i onClick={() => {deleteDiv(country.code); toastr.error('Deleted this data.', `${country.name} - ${country.emoji}`, {timeOut: 3000})}} className="fa-solid fa-xmark fa-2x border border-black p-1 rounded-circle"></i></span>
                                            </div><hr />
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
