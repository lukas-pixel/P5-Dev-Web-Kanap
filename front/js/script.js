"use strict";

// creation description
function createDescription(sofa) {
  let productDescription = document.createElement("p");
  productDescription = sofa.description;
  console.log(productDescription);
}

//creation titre
function createTitle(sofa) {
  let productName = document.createElement("h3");
  productName = sofa.name;
}

// creation image
function createImg(sofa) {
  let productImg = document.createElement("img");
  productImg.src = sofa.imageUrl;
  productImg.alt = sofa.altTxt;
}

function listProducts(allSofas) {
  let sofa;
  for (let i = 0; i < allSofas.length; i++) {
    sofa = allSofas[i];
    createImg(sofa);
    createTitle(sofa);
  }
}

function getProducts (){
  fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then((data) => listProducts(data));
}

getProducts();
