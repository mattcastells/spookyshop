const getData = () => {
    console.log("Loading products")
    return fetch("/products.json", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
    .then(function (response) {
        return response.json();
    })
}

export default getData;