import React, { useEffect, useState } from "react";
import "./categoryFilter.sass";
import { useParams } from 'react-router-dom';
import { getFirestore } from "../firebaseInit"
import { Link } from "react-router-dom";


const CategoryFilter = () => {
    const {category} = useParams()
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        const db = getFirestore();
        const categoriesDb = db.collection("categories");
        categoriesDb.get().then(query=>{
            if(query.size === 0){
                console.error("Error loading Categories");
                return;
            }

            const categoriesQuery = query.docs.map(cat => {return {id:cat.id, ...cat.data()}})
            setCategories([...categoriesQuery])
        })
    },[])


    const renderDropdownItem = (item) =>{
        return (
        <li key={item.key}>
            <Link className="dropdown-item" to={"/category/"+item.key}>
                {item.name}
            </Link>
        </li>
        )
    }


    return (
        <div className="mx-5 mt-2">
            {(category) ? <h2 className="filtro">Filtrando por: {categories.find(cat=>cat.key===category)?.name}</h2>:<h2 className="filtro">Filtrar por categoria</h2>}
            <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="categoriesDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Categorias
                </button>
                <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
                    <li>
                        <Link className="dropdown-item" to="">
                            Remover filtro
                        </Link>
                    </li>
                    {categories && categories.map(cat => renderDropdownItem(cat))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryFilter;
