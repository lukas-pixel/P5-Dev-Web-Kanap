"use strict";

async function getProductById (idProduct){
   let res = await fetch("http://localhost:3000/api/products/" + idProduct)
    return res.json();
}


async function sectionCartItem(){

    let maVariable = await getProductById();
    console.log(maVariable);
}

sectionCartItem();

function creationDom() {

    //creation p Delete
    let pDeleteItem = document.createElement("p");
    pDeleteItem.classList.add("deleteItem");
    pDeleteItem.innerText = "Supprimer";
    // creation div delete + ajout de l'enfant p delete
    let divContentSettingsDelete = document.createElement("div");
    divContentSettingsDelete.classList.add("cart__item__content__settings__delete");
    divContentSettingsDelete.appendChild(pDeleteItem);

    //creation input
    let inputQuantity = document.createElement("input");
    inputQuantity.type = "number";
    inputQuantity.classList.add("itemQuantity");
    inputQuantity.name = "itemQuantity";
    inputQuantity.min = "1";
    inputQuantity.max = "100";
    inputQuantity.value = "42";
    // creation p quantity
    let pQuantity = document.createElement("p");
    pQuantity.innerText = "Qté : ";
    //creation div quantity + ajout enfant input + p quantity
    let divContentSettingsQuantity = document.createElement("div");
    divContentSettingsQuantity.appendChild(inputQuantity);
    divContentSettingsQuantity.appendChild(pQuantity);

    //creation div Content Settings + ajout enfant div quantity + div Delete
    let divContentSettings = document.createElement("div");
    divContentSettings.appendChild(divContentSettingsDelete);
    divContentSettings.appendChild(divContentSettingsQuantity);

    //creation p price de div Content description
    let pDescriptionPrice = document.createElement("p");
    //pDescriptionPrice.innerText = .price;
    //creation p color de div content description
    let pDescriptionColor = document.createElement("p");
    //pDescriptionColor.innerText = ;
    //creation h2

}

creationDom();