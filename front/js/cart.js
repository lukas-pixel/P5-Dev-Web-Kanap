"use strict";
//---------------------------------function appel de mon API------------------------------------------------------------
async function getProductById (idProduct){
   let res = await fetch("http://localhost:3000/api/products/" + idProduct)
    return res.json();
}

//------------------function qui appel mon localstorage + calcule de la quantity total et prix total--------------------
async function rechargerCart(){
//si local est null alors il est vide
    let productCart = localStorage.getItem("ProductCart");

//on vide la section avant de bouclé sur notre DOM
    let sectionItem = document.getElementById("cart__items");
    sectionItem.innerHTML = "";
//si local est null alors il est vide
    if (productCart !== null) {
        productCart = JSON.parse(productCart);
    let numberTotalQuantity = 0;
    let totalPrice = 0;


        for (let productOrder of productCart) {
            let item = await getProductById(productOrder.product_id);
            numberTotalQuantity += productOrder.product_quantity;
            totalPrice += (productOrder.product_quantity * item.price);
            addArticle(item, productOrder);
        }

        let productTotalQuantity = document.getElementById("totalQuantity");
        productTotalQuantity.innerText = numberTotalQuantity;

        let productTotalPrice = document.getElementById("totalPrice");
        productTotalPrice.innerText = totalPrice;
    }
}

//----------------------- function pour mise en forme des paragraphe et h2 ---------------------------------------------

function simpleForm(param,text) {
    let item = document.createElement(param);
    item.innerText = text;

    return item;
}

//----------------------------function pour mise en forme div ----------------------------------------------------------

function parentChildClassForm(param, nameClass, child, child2, child3) {
    let divItem = document.createElement(param);
    divItem.classList.add(nameClass);
    divItem.appendChild(child);

    if(child2 !== undefined && child2 !== "") {
        divItem.appendChild(child2);
    }

    if (child3 !== undefined && child3 !== "") {
        divItem.appendChild(child3);
    }

    return divItem;
}


//-----------------------------function creation des element html dans le DOM-------------------------------------------
function addArticle(item, product) {

//creation p Delete
    let itemDelete = simpleForm("p","Supprimer");
// creation div delete + ajout de l'enfant p delete
    let cartSetting = parentChildClassForm("div","cart__item__content__settings__delete", itemDelete)

//creation input
    let quantityNumber = document.createElement("input");
    quantityNumber.type = "number";
    quantityNumber.classList.add("itemQuantity");
    quantityNumber.name = "itemQuantity";
    quantityNumber.min = "1";
    quantityNumber.max = "100";
    quantityNumber.value = product.product_quantity;
// creation p quantity
    let quantityText = simpleForm("p","Qté : ");
//creation div quantity + ajout enfant input + p quantity
    let cartQuantity = parentChildClassForm("div","cart__item__content__settings__quantity", quantityText, quantityNumber);

//creation div Content Settings + ajout enfant div quantity + div Delete
    let cartSettingsQuantity = parentChildClassForm("div", "cart__item__content__settings", cartSetting, cartQuantity);

//creation p price de div Content description
    let cartPrice = simpleForm("p",item.price + " €");
//creation p color de div content description
    let cartColor = simpleForm("p", product.product_color);
//creation h2
    let cartName = simpleForm("h2", item.name);
//creation div description + ajouts enfants
    let cartContentDescription = parentChildClassForm("div","cart__item__content__description", cartName, cartColor, cartPrice);
    
//creation cartItemContent + ajouts enfants
    let cartItemContent = parentChildClassForm("div","cart__item__content", cartContentDescription, cartSettingsQuantity);

//creation img
    let imgItem = document.createElement("img");
    imgItem.src = item.imageUrl;
    imgItem.alt = item.altTxt;
//Creation cartImg + ajouts enfants
    let cartImg = parentChildClassForm("div","cart__item__img", imgItem);

//creation article + ajouts enfants
    let cartItem = parentChildClassForm("article", "cart__item", cartImg, cartItemContent);

    //rattachement a la section existante
    let sectionItem = document.getElementById("cart__items");
    sectionItem.appendChild(cartItem);

//Action changement quantité
    addChangeQuantity(quantityNumber, item, product);

//action supprimer un article
    addDeleteItem(itemDelete, cartItem, item, product);
}

//-------------------------------function pour changer la quantity------------------------------------------------------
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

//-----------------CREATION DU FORMULAIRE---------------------------------------------------------------------------------------------------------------------
//--------------------------recuperation des element html---------------------------------------------------------------
let formCart = document.querySelector(".cart__order__form");
let firstNameForm = document.getElementById("firstName");
let lastNameForm = document.getElementById("lastName");
let addressForm = document.getElementById("address");
let cityForm = document.getElementById("city");
let emailForm = document.getElementById("email");
let submit = document.querySelector("#order")


//-----------------------Creation des RegExp----------------------------------------------------------------------------
let regularRegExp = new  RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
let emailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);

//--------------------function firstName---------------------------------
function valueFirstName() {
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

    if (regularRegExp.test(firstNameForm.value) && firstNameForm.value.length >= 3) {
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

    if(regularRegExp.test(lastNameForm.value) && lastNameForm.value.length >= 3) {
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

    if(addressRegExp.test(addressForm.value) && addressForm.value.length >= 3) {
        addressErrorMsg.innerHTML = '';
        return true
    } else {
        addressErrorMsg.innerHTML = 'Veuillez renseigner une adresse postale valide.';
        return false
    }
}

//--------------------function city--------------------------------------------
function valueCity() {
    let cityErrorMsg = document.getElementById("cityErrorMsg");

    if (regularRegExp.test(cityForm.value) && cityForm.value.length >= 3) {
        cityErrorMsg.innerHTML = '';
        return true
    } else {
        cityErrorMsg.innerHTML = 'Veuillez renseigner un nom de ville valide.';
        return false
    }
}

//---------------------function email--------------------------------------------
function valueEmail() {
    let emailErrorMsg = document.getElementById("emailErrorMsg");

    if (emailRegExp.test(emailForm.value)) {
        emailErrorMsg.innerHTML = '';
        return true;
    } else {
        emailErrorMsg.innerHTML = 'Veuillez renseignez une adresse mail valide.';
        return false;
    }
}

//--------------------function inscription dans le formulaire--------------------------------------------------------

function getForm() {

    formCart.firstName.addEventListener('change', () => {
        valueFirstName(this);
    })

    formCart.lastName.addEventListener('change', () => {
        valueLastName(this);
    })

    formCart.address.addEventListener('change', () => {
        valueAddress(this);
    })

    formCart.city.addEventListener('change', () => {
        valueCity(this);
    })

    formCart.email.addEventListener('change', () => {
        valueEmail(this);
    })
}

//------------------function envoie de la requête au back-----------------------------------------------------------
function submitForm() {

    let panierLocalStorage = JSON.parse(localStorage.getItem("ProductCart"));


    submit.addEventListener('click', (e) => {
        e.preventDefault();

        let formValues = {
            firstName : firstNameForm.value,
            lastName : lastNameForm.value,
            address : addressForm.value,
            city : cityForm.value,
            email : emailForm.value
        }

        if (
            !formValues.firstName ||
            !valueFirstName() ||
            !formValues.lastName ||
            !formValues.address ||
            !formValues.city ||
            !formValues.email) {
            alert("Merci de renseigner toutes les informations")
        } else {

            let products = [];
            for (let i=0; i < panierLocalStorage.length; i++) {
                products.push(panierLocalStorage[i].product_id);
            }

            let formData = {
                products : products,
                contact : formValues,
            }

           fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    window.location.href = './confirmation.html?id='+ data.orderId;
                })
        }
    })
}

rechargerCart();
getForm();
submitForm();