import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

import { getFirestore } from "../firebaseInit"
import ItemDetail from './itemDetail';
import "./itemDetailContainer.sass"

const ItemDetailContainer = () => {
    const {itemId} = useParams();
    // Funcion para poder agarrar el json products que tiene toda la info de los productos
    // Imagenes de productos fueron obtenidas por medio de web scrapping google images
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const db = getFirestore();
        const itemCollection = db.collection("items");
        const categories = db.collection("categories");
        const item_db = itemCollection.doc(itemId);

        // Get item
        item_db.get().then(doc=>{
            if(!doc.exists){
                console.error("Item no existe");
                return;
            }
            const item = doc.data();
            // Then get associated category
            const itemCategory = categories.doc("" + item.category);
            itemCategory.get().then(itemCat=>{
                setItem({id:doc.id, ...doc.data(),category:itemCat.data().name});
            })
            
        })
        .catch(error=>{
            console.error("Error buscando el item",error);
        })
        .finally(()=>{
            setLoading(false);
        });
    },[])   

    const renderItemDetail = () =>{
        if(item == null){
            return renderNotFound()
        }
        return <ItemDetail item={item}/>
    }

    const renderNotFound = () =>{
        return <h1>No encontrado</h1>
    }

    const renderLoading = () =>{
        return <h1>Cargando...</h1>
    }

    return (
        <div className="itemDetailContainer">
            {
                loading ? renderLoading() : renderItemDetail()
            }
        </div>
    )
}

export default ItemDetailContainer
