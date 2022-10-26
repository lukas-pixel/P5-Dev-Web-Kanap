"use strict";
function getProducts() {
    fetch("http://localhost:3000/api/products")
        .then(res => res.json())
        .then((data) => listProducts(data));
}

function

getProducts();

addProduct();

function addProduct() {

    let productcart = localStorage.getItem("productCart");

    let arrayAddProduct = [];
    arrayAddProduct.push(productcart);
}