"use strict";
//-----------------function appel de mon API-------------------------------------------------------------------------------
async function getProductById (idProduct){
   let res = await fetch("http://localhost:3000/api/products/" + idProduct)
    return res.json();
}

//------------------function qui appel mon localstorage + calcule de la quantite total et prix total-----------------------
async function rechargerCart(){
//si local est null alors il est vide
    let productCart = localStorage.getItem("ProductCart");

    if (productCart !== null) {
        productCart = JSON.parse(productCart);
    let numberTotalQuantity = 0;
    let totalPrice = 0;

        for (let productOrder of productCart) {
            let item = await getProductById(productOrder.product_id);
            numberTotalQuantity += productOrder.product_quantity;
            totalPrice += (productOrder.product_quantity * item.price);
            addSection(item, productOrder);
        }

        let productTotalQuantity = document.getElementById("totalQuantity");
        productTotalQuantity.innerText = numberTotalQuantity;

        let productTotalPrice = document.getElementById("totalPrice");
        productTotalPrice.innerText = totalPrice;
    }
}

//-----------------------------function creation des element html dans le DOM-------------------------------------------
function addSection(item, product) {

    let sectionItem = document.getElementById("cart__items");
    sectionItem.innerHTML = "";

//creation p Delete
    let itemDelete = document.createElement("p");
    itemDelete.classList.add("deleteItem");
    itemDelete.innerText = "Supprimer";
// creation div delete + ajout de l'enfant p delete
    let cartSettings = document.createElement("div");
    cartSettings.classList.add("cart__item__content__settings__delete");
    cartSettings.appendChild(itemDelete);

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
    sectionItem.appendChild(cartItem);

//Action changement quantité
    addChangeQuantity(quantityNumber, item, product);

//action supprimer un article
    addDeleteItem(itemDelete, cartItem, item, product);

}

//-------------------------------function pour changer la quantite------------------------------------------------------
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

        rechargerCart();
    })
}

//------------------------------function pour supprimer notre element du panier-----------------------------------------
function addDeleteItem(itemDelete, cartItem, item, product) {
    //Suppression d'un element
    itemDelete.addEventListener("click", () => {

        let panierLocalStorage = JSON.parse(localStorage.getItem("ProductCart"));

        panierLocalStorage = panierLocalStorage.filter(item => item.product_id !== product.product_id || item.product_color !== product.product_color);
        localStorage.setItem("ProductCart", JSON.stringify(panierLocalStorage));
        alert("Votre article a bien été supprimé");
        cartItem.remove();
        rechargerCart();
    })
}

//-----------------function pour refresh notre page pour mettre a jour notre quantite total et notre prix total--------------------------------


//-----------------CREATION DU FORMULAIRE---------------------------------------------------------------------------------------------------------------------
//--------------------------recuperation des element html---------------------------------------------------------------
let formCart = document.getElementsByClassName("cart__order__form");
let firstNameForm = document.getElementById("firstName");
let lastNameForm = document.getElementById("lastName");
let addressForm = document.getElementById("address");
let cityForm = document.getElementById("city");
let emailForm = document.getElementById("email");


//-----------------------Creation des RegExp----------------------------------------------------------------------------
let regularRegExp = new  RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
let emailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);

//--------------------function fisrtName---------------------------------
function valueFirstName() {
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

    if (regularRegExp.test(firstNameForm.value)) {
        firstNameErrorMsg.innerHTML = '';
        return true
    } else {
        firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre prénom.';
        return false
    }
}

//--------------------function lastName-----------------------------------
function valueLastName() {
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

    if(regularRegExp.test(lastNameForm.value)) {
        lastNameErrorMsg.innerHTML = '';
        return true
    } else {
        lastNameErrorMsg.innerHTML = 'Veuillez renseigner votre nom.';
        return false
    }
}

//--------------------function address--------------------------------------
function valueAddress() {
    let addressErrorMsg = document.getElementById("addressErrorMsg");

    if(regularRegExp.test(addressForm.value)) {
        addressErrorMsg.innerHTML = '';
        return true
    } else {
        addressErrorMsg.innerHTML = 'Veuillez renseigner une adresse postale valide.';
        return false
    }
}
rechargerCart();

