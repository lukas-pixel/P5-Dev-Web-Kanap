"use strict";

async function getProductById (idProduct){
   let res = await fetch("http://localhost:3000/api/products/" + idProduct)
    return res.json();
}


async function sectionCartItem(){
//si local est null alors il est vide
    let productCart = localStorage.getItem("ProductCart");

    if (productCart !== null) {
        productCart = JSON.parse(productCart);

        for (let product of productCart) {
            let item = await getProductById(product.product_id);
            creationDom(item, product);
        }
    }
}

sectionCartItem();

function creationDom(item, product) {
//élements Delete---------------------------------------------------------
     //creation p Delete
    let pDeleteItem = document.createElement("p");
    pDeleteItem.classList.add("deleteItem");
    pDeleteItem.innerText = "Supprimer";
    // creation div delete + ajout de l'enfant p delete
    let divContentSettingsDelete = document.createElement("div");
    divContentSettingsDelete.classList.add("cart__item__content__settings__delete");
    divContentSettingsDelete.appendChild(pDeleteItem);

//element Changement quantité---------------------------------------------------------
    //creation input
    let inputQuantity = document.createElement("input");
    inputQuantity.type = "number";
    inputQuantity.classList.add("itemQuantity");
    inputQuantity.name = "itemQuantity";
    inputQuantity.min = "1";
    inputQuantity.max = "100";
    inputQuantity.value = product.product_quantity;
    // creation p quantity
    let pQuantity = document.createElement("p");
    pQuantity.innerText = "Qté : ";
    //creation div quantity + ajout enfant input + p quantity
    let divContentSettingsQuantity = document.createElement("div");
    divContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
    divContentSettingsQuantity.appendChild(pQuantity);
    divContentSettingsQuantity.appendChild(inputQuantity);

    //Au changement de la quantite----------------------------------------------------------------
    inputQuantity.addEventListener("change", (e) => {
        let panierLocalStorage = JSON.parse(localStorage.getItem("ProductCart"));

        panierLocalStorage = panierLocalStorage.map(item => {
            if(item.product_id === product.product_id && item.product_color === product.product_color) {
                item.product_quantity = Number(e.target.value);
            }
            return item;
        })

        localStorage.setItem("ProductCart", JSON.stringify(panierLocalStorage))
    })

    //creation div Content Settings + ajout enfant div quantity + div Delete
    let divContentSettings = document.createElement("div");
    divContentSettings.classList.add("cart__item__content__settings");
    divContentSettings.appendChild(divContentSettingsDelete);
    divContentSettings.appendChild(divContentSettingsQuantity);

    //creation p price de div Content description
    let pDescriptionPrice = document.createElement("p");
    pDescriptionPrice.innerText = item.price + " €";
    //creation p color de div content description
    let pDescriptionColor = document.createElement("p");
    pDescriptionColor.innerText = product.product_color;
    //creation h2
    let productTitle = document.createElement("h2");
    productTitle.innerText = item.name;
    //creation div description + ajouts enfants
    let divContentDescription = document.createElement("div");
    divContentDescription.classList.add("cart__item__content__description");
    divContentDescription.appendChild(productTitle);
    divContentDescription.appendChild(pDescriptionColor);
    divContentDescription.appendChild(pDescriptionPrice);

    //creation divItemContent + ajouts enfants
    let divItemContent = document.createElement("div");
    divItemContent.classList.add("cart__item__content");
    divItemContent.appendChild(divContentDescription);
    divItemContent.appendChild(divContentSettings);

    //creation img
    let productImg = document.createElement("img");
    productImg.src = item.imageUrl;
    productImg.alt = item.altTxt;
    //Creation divItemImg + ajouts enfants
    let divItemImg = document.createElement("div");
    divItemImg.classList.add("cart__item__img");
    divItemImg.appendChild(productImg);

    //creation article + ajouts enfants
    let articleCart = document.createElement("article");
    articleCart.classList.add("cart__item");
    articleCart.appendChild(divItemImg);
    articleCart.appendChild(divItemContent);

    //rattachement a la section existante
    let sectionItem = document.getElementById("cart__items");
    sectionItem.appendChild(articleCart);

    //Suppression d'un element
    pDeleteItem.addEventListener("click", () => {

        let panierLocalStorage = JSON.parse(localStorage.getItem("ProductCart"));

        panierLocalStorage = panierLocalStorage.filter(item => item.product_id !== product.product_id || item.product_color !== product.product_color);
        localStorage.setItem("ProductCart", JSON.stringify(panierLocalStorage));
        alert("Votre article a bien été supprimé");
        articleCart.remove();
    })

}