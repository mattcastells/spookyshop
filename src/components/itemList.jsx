import React, {useEffect, useState} from "react";
import Item from "./item";
import {getFirestore} from "../firebaseInit"

const ItemList = ({filterCategory}) => {
    
    // Funcion para poder agarrar el json products que tiene toda la info de los productos
    // Imagenes de productos fueron obtenidas por medio de web scrapping google images
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);

    async function getFilteredItems(db,itemCollection){
        const categoryCollection = db.collection("categories");
        const filteredCategory = categoryCollection.where("key","==",filterCategory);
        const query = await filteredCategory.get();
        const categories = query.docs;
        if(categories.length > 0){
            const categoryId = categories[0].id;
            const filteredItems = itemCollection.where('category','==',+categoryId);
            return filteredItems;
        }
        else
            return [];
    }
    //Hago que agarre la data del products.json al iniciar el componente
    async function fetchItems(){
        const db = getFirestore();
        const itemCollection = db.collection("items");
        
        
        let filteredItems = itemCollection;
        if (filterCategory){
            filteredItems = await getFilteredItems(db,itemCollection);
        }
        filteredItems.get().then(query=>{
            if(query.size === 0){
                console.log("No hay items");
            }
            setData(query.docs.map(doc=>{return {id:doc.id, ...doc.data()}}));
        })
        .catch(error=>{
            console.error("Error buscando los items",error);
        })
        .finally(()=>{
            setLoading(false);
        });
    }
    useEffect(() => {
        fetchItems();
    }, []);

    //En caso que cambie la categoria, fuerzo un fetch
    useEffect(()=>{
        fetchItems();
    },[filterCategory])


    return (<>
            {loading?<h2>Cargando items...</h2>:data && data.length === 0?<h2>Sin items</h2>:<></>}
            {
                data && 
                data.length > 0 && 
                data.sort((a,b)=>a.title.localeCompare(b.title))
                .map((product) =>
                    <Item key={product.id} item={product}></Item>
                )
            }
        </>
    );
};

export default ItemList;

