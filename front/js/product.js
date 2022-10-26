"use strict";


function getProducts() {
    fetch("http://localhost:3000/api/products")
        .then(res => res.json())
        .then((data) => listProducts(data));
}

getProducts();

function listProducts(allSofas) {

    let str = window.location.href;
    let url = new URL(str);
    var productUrl = new URLSearchParams(url.search);

    for (let sofa of allSofas) {
        if(productUrl.has("id") && productUrl.get('id') === sofa._id) {
            var name = productUrl.get('id');
            ficheProduct(sofa);
            break;
        } else {
            console.log("erreur ID");
        }
    }

}

function listColors(colors) {

    let productColor = document.getElementById("colors");
    for (let i = 0; i < colors.length; i++) {
        let color = document.createElement("option");
        color.value = colors[i];
        color.innerText = colors[i];
        productColor.appendChild(color);
    }
}


function ficheProduct(sofa) {
    //creation de img
    let productImg = document.createElement("img");
    productImg.src = sofa.imageUrl;
    productImg.alt = sofa.altTxt;
    //Ajout de img dans la div id="item__img"
    let divItemImg = document.getElementById("item__img");
    divItemImg.appendChild(productImg);

    //mise en place du titre
    let productTitle = document.getElementById("title");
    productTitle.innerText = sofa.name;

    //mise en place du prix
    let productPrice = document.getElementById("price");
    productPrice.innerText = sofa.price;

    //mise en place description
    let productDescription = document.getElementById("description");
    productDescription.innerText = sofa.description;

    //creation option
    listColors(sofa.colors);
}

function saveProduct() {
    let inputQuantity = document.getElementById("quantity").value;
    let colorChoice = document.getElementById("colors").value;

    let str = window.location.href;
    let url = new URL(str);
    var productUrl = new URLSearchParams(url.search);
    let idSofa = '';

    if(productUrl.has("id")) {
        idSofa = productUrl.get("id");
    } else {
        console.log("erreur pas d'id");
        throw "erreur pas d'id";
    }


    // todo récuperer l'objet sofa + sa couleur + sa quantité
    let objectProduct = {
        product_id: idSofa,
        product_color: colorChoice,
        product_quantity: inputQuantity,
    }
    // todo Enregistrer tout ça en local storage avec une clé unique (?)
    let productJSON = JSON.stringify(objectProduct);
    localStorage.setItem("ProductCart", productJSON);
    // todo récupérer le tout dans le panier et afficher les données

    // todo have fun

}


