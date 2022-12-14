"use strict";
//-----------------------------Fonction qui fait appel a mon API--------------------------------------------------------
function getProducts (){
  fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then((data) => listProducts(data));
}

//-----------------------------Fonction pour parcourir le tableau de mes canapés----------------------------------------
function listProducts(allSofas) {
  let sofa;
  for (let i = 0; i < allSofas.length; i++) {
    sofa = allSofas[i];
    section(sofa);
  }
}

//-----------------------------function creation des element html dans le DOM-------------------------------------------
function section(sofa) {

  //creation de h3
  let productName = document.createElement("h3");
  productName.innerText = sofa.name;
  //creation de p
  let productDescription = document.createElement("p");
  productDescription.innerText = sofa.description;
  //creation du parent figcaption + ajout des enfants img et p
  let createFigcaption = document.createElement("figcaption");
  createFigcaption.appendChild(productName);
  createFigcaption.appendChild(productDescription);

  //creation de image
  let productImg = document.createElement("img");
  productImg.src = sofa.imageUrl;
  productImg.alt = sofa.altTxt;
  // creation du parent figure + ajout de l'enfant image et figcaption
  let createFigure = document.createElement("figure");
  createFigure.appendChild(productImg);
  createFigure.appendChild(createFigcaption);

  //creation de a
  let productLink = document.createElement("a");
  productLink.href = "./product.html?id=" + sofa._id;
  //a + figure
  productLink.appendChild(createFigure);
  //creation du parent section + ajout des enfants a et figure
  let sectionDOM = document.createElement("section");
  sectionDOM.classList.add("items");
  sectionDOM.appendChild(productLink);

  //div pour row les items
  let gridItems = document.getElementById("gridItems");
  gridItems.appendChild(sectionDOM);

  //ajout enfant section a parent body
  let items = document.getElementById("limitedWidthDiv");
  items.appendChild(gridItems);

}

getProducts();


