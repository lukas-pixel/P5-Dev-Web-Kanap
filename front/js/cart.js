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
//creation p Delete
    let itemDelete = document.createElement("p");
    itemDelete.classList.add("deleteItem");
    itemDelete.innerText = "Supprimer";
// creation div delete + ajout de l'enfant p delete
    let cartSettings = document.createElement("div");
    cartSettings.classList.add("cart__item__content__settings__delete");
    cartSettings.appendChild(itemDelete);

//action supprimer un article
    addDeleteItem(itemDelete, cartItem, item, product);


//creation input
    let quantityNumber = document.createElement("input");
    quantityNumber.type = "number";
    quantityNumber.classList.add("itemQuantity");
    quantityNumber.name = "itemQuantity";
    quantityNumber.min = "1";
    quantityNumber.max = "100";
    quantityNumber.value = product.product_quantity;
// creation p quantity
    let quantity = document.createElement("p");
    quantity.innerText = "Qté : ";
//creation div quantity + ajout enfant input + p quantity
    let cartQuantity = document.createElement("div");
    cartQuantity.classList.add("cart__item__content__settings__quantity");
    cartQuantity.appendChild(quantity);
    cartQuantity.appendChild(quantityNumber);

//Action changement quantité
    addChangeQuantity(quantityNumber, item, product);

//creation div Content Settings + ajout enfant div quantity + div Delete
    let cartSettingsQuantity = document.createElement("div");
    cartSettingsQuantity.classList.add("cart__item__content__settings");
    cartSettingsQuantity.appendChild(cartSettings);
    cartSettingsQuantity.appendChild(cartQuantity);

//creation p price de div Content description
    let cartPrice = document.createElement("p");
    cartPrice.innerText = item.price + " €";
//creation p color de div content description
    let cartColor = document.createElement("p");
    cartColor.innerText = product.product_color;
//creation h2
    let cartName = document.createElement("h2");
    cartName.innerText = item.name;
//creation div description + ajouts enfants
    let cartContentDescription = document.createElement("div");
    cartContentDescription.classList.add("cart__item__content__description");
    cartContentDescription.appendChild(cartName);
    cartContentDescription.appendChild(cartColor);
    cartContentDescription.appendChild(cartPrice);
    
//creation cartItemContent + ajouts enfants
    let cartItemContent = document.createElement("div");
    cartItemContent.classList.add("cart__item__content");
    cartItemContent.appendChild(cartContentDescription);
    cartItemContent.appendChild(cartSettingsQuantity);

//creation img
    let imgItem = document.createElement("img");
    imgItem.src = item.imageUrl;
    imgItem.alt = item.altTxt;
//Creation cartImg + ajouts enfants
    let cartImg = document.createElement("div");
    cartImg.classList.add("cart__item__img");
    cartImg.appendChild(imgItem);

//creation article + ajouts enfants
    let cartItem = document.createElement("article");
    cartItem.classList.add("cart__item");
    cartItem.appendChild(cartImg);
    cartItem.appendChild(cartItemContent);

    //rattachement a la section existante
    let sectionItem = document.getElementById("cart__items");
    sectionItem.appendChild(cartItem);

}

function addChangeQuantity(quantityNumber, item, product) {
    quantityNumber.addEventListener("change", (e) => {
        let panierLocalStorage = JSON.parse(localStorage.getItem("ProductCart"));

        panierLocalStorage = panierLocalStorage.map(item => {
            if(item.product_id === product.product_id && item.product_color === product.product_color) {
                item.product_quantity = Number(e.target.value);
            }
            return item;
        })

        localStorage.setItem("ProductCart", JSON.stringify(panierLocalStorage))
    })
}

function addDeleteItem(itemDelete, cartItem, item, product) {
    //Suppression d'un element
    itemDelete.addEventListener("click", () => {

        let panierLocalStorage = JSON.parse(localStorage.getItem("ProductCart"));

        panierLocalStorage = panierLocalStorage.filter(item => item.product_id !== product.product_id || item.product_color !== product.product_color);
        localStorage.setItem("ProductCart", JSON.stringify(panierLocalStorage));
        alert("Votre article a bien été supprimé");
        cartItem.remove();
    })
}