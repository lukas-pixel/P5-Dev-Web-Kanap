"use strict";

getProduct();

function getProduct (){
    fetch("http://localhost:3000/api/products")
        .then(res => res.json())
        .then((data) => arrayProduct(data));
}

function arrayProduct(canapes) {
    for (let i = 0; i < canapes.length; i++) {
        const canapeInfo = canapes[i];
    }
}

// création de "a"

