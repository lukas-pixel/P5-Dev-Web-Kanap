"use strict";

let orderId = document.querySelector("#orderId")

var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");
orderId.innerText = id;