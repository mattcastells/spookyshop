import React from 'react'

const SearchBar = () => {
    return (
        <div className={"d-flex"}>
            <input className={"form-control me-2"} type={"search"} placeholder={"Buscar"} aria-label={"Buscar"}></input>
            <button className={"btn btn-outline-success"} type={"submit"}>Buscar</button>
        </div>
    )
}

export default SearchBar;