{const xhr1 = new XMLHttpRequest();
xhr1.open("GET", "/api/products/", true);
xhr1.setRequestHeader("Content-Type", "application/json");

xhr1.onreadystatechange = function() {
if (xhr1.readyState === 4 && xhr1.status === 200) {
    var response = JSON.parse(xhr1.responseText);
    // Handle the response data here
    // Save a value in session storage
    //console.log(response);
    sessionStorage.setItem('productsss', JSON.stringify(response));

    
}
};

xhr1.send();}

{const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click', () => {
        nav.classList.add('active');

    })

}


if(close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');

    })

}

 
 
}

function Add_details(){
    var uJSON = sessionStorage.getItem('UserSignIn');
    var u = JSON.parse(uJSON);
    // Get the input data
    const Name1 =  u.Name;
    const Address1 = u.address;
    const PhoneNumber1 = u.phoneNumber;
    const Notice1 = '';

    if (Name1 === '' || Address1 === '' || PhoneNumber1 === '' ) {
    // Handle the case when one or more fields are empty
    console.log('One or more fields are empty');
    window.location.replace("/products");
     
     
    return;
    } 


     

    // Send the form data to the server using an AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/details",true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("Name=" + encodeURIComponent(Name1) +"&UserName=" + encodeURIComponent(u.Name) + "&Address=" + encodeURIComponent(Address1) + "&PhoneNumber=" + encodeURIComponent(PhoneNumber1) + "&Notice=" + encodeURIComponent(Notice1));


    
     
    window.location.replace("/ordersReadyToGo");
     
     
}

function addToCart(productName, kind, price, quantity)
{
    var uJSON = sessionStorage.getItem('UserSignIn');
    var u = JSON.parse(uJSON);
    // Send the form data to the server using an AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/orders");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("ProductName=" + encodeURIComponent(productName) +"&UserName=" + encodeURIComponent(u.Name) +  "&Price=" + encodeURIComponent(price) +"&Kind=" + encodeURIComponent(kind) + "&Quantity=" + encodeURIComponent(quantity));
    document.getElementById(productName).style.background = "green";
    document.getElementById(productName).textContent = "Added Successful !";
    location.reload();
    
}


function removeFromCart(id){

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/api/orders/' + id);
    xhr.setRequestHeader('Authorization', 'Bearer <access_token>');
    xhr.send();
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
             
          
        } else {
          alert('An error occurred while deleting product.');
        }
    });
    location.reload();  


}

//id == id of product ,id2 id of de
function removeFromUpdateDetails(products,ProductName_,id2){
    
    const productsArray = products ? JSON.parse(products) : [];
     
    const updatedProductsArray = productsArray.filter(product => product.ProductName !== ProductName_);
    
    const productsJson = JSON.stringify(updatedProductsArray);
    
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', '/api/details/' + id2 , true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("Products=" + encodeURIComponent(productsJson));

    location.reload();
    location.reload();
    
    
}



function saveUpdatedDetails(){

    // Get the input data
    /*const Name1 = document.getElementById('Name2').value;
    const Address1 = document.getElementById('Address2').value;
    const PhoneNumber1 = document.getElementById('PhoneNumber2').value;
    const Notice1 = document.getElementById('Notice2').value;


    

    // Send the form data to the server using an AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/details/" + id,true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("Name=" + encodeURIComponent(Name1) + "&Address=" + encodeURIComponent(Address1) + "&PhoneNumber=" + encodeURIComponent(PhoneNumber1) + "&Notice=" + encodeURIComponent(Notice1));

    */
    alert("Order Updated Successfuly!!");
    window.location.href = "/ordersReadyToGo";
}



function removeFromOrders(id){

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/api/details/' + id);
    xhr.setRequestHeader('Authorization', 'Bearer <access_token>');
    xhr.send();
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
           
          location.reload();
        } else {
          alert('An error occurred while deleting product.');
        }
    });

}


function showSelectedProduct(){
   
    

    var productSelect = document.getElementById("productSelect");
    var selectedProduct = productSelect.value;
    var productContainer = document.getElementById("productScreen");
    var productHTML = "";
    var products_ = sessionStorage.getItem('productsss');
    products_ = JSON.parse(products_);

    if (selectedProduct === "All") {
        
        for(let i=0;i < products_.length;i++){
            productHTML +=`<div class="pro">`;
            productHTML+=`<img src="img/products/${products_[i].ProductName}.jpeg" alt="">
            <div class="description">
                <span>${products_[i].Kind}</span>
                <h5>${products_[i].ProductName}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>₪${products_[i].Price}</h4>
            </div>
            <div id="add-to-cart">
                <button class="btn123" id='${products_[i].ProductName}' onclick="addToCart('${products_[i].ProductName}', '${products_[i].Kind}', '${products_[i].Price}', '1')">Add to Cart</button>
            </div>`;
            productHTML+=`</div>`;
        }
        
        productContainer.innerHTML = productHTML;
        
    } else if (selectedProduct === "Computer") {
        
        for(let i=0;i < products_.length;i++){
            
            if(products_[i].Kind!=="Mouse" && products_[i].Kind!=="KeyBoard"){
                productHTML +=`<div class="pro">`;
                productHTML+=`<img src="img/products/${products_[i].ProductName}.jpeg" alt="">
            <div class="description">
                <span>${products_[i].Kind}</span>
                <h5>${products_[i].ProductName}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>₪${products_[i].Price}</h4>
            </div>
            <div id="add-to-cart">
                <button class="btn123" id='${products_[i].ProductName}' onclick="addToCart('${products_[i].ProductName}', '${products_[i].Kind}', '${products_[i].Price}', '1')">Add to Cart</button>
            </div>`;
            productHTML+=`</div>`;
            }
            
        }
        
        productContainer.innerHTML = productHTML;
    } else if (selectedProduct === "Mouse") {
        
        for(let i=0;i < products_.length;i++){
            if(products_[i].Kind==="Mouse"){
                productHTML +=`<div class="pro">`;
                productHTML+=`<img src="img/products/${products_[i].ProductName}.jpeg" alt="">
            <div class="description">
                <span>${products_[i].Kind}</span>
                <h5>${products_[i].ProductName}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>₪${products_[i].Price}</h4>
            </div>
            <div >
                <button class="btn123" id="${products_[i].ProductName}" onclick="addToCart('${products_[i].ProductName}', '${products_[i].Kind}', '${products_[i].Price}', '1')">Add to Cart</button>
            </div>`;
            productHTML+=`</div>`;
            }
            
        }
        
        productContainer.innerHTML = productHTML;
    }else if (selectedProduct === "KeyBoard") {
        
        for(let i=0;i < products_.length;i++){
            if(products_[i].Kind === "KeyBoard"){
                productHTML +=`<div class="pro">`;
                productHTML+=`<img src="img/products/${products_[i].ProductName}.jpeg" alt="">
            <div class="description">
                <span>${products_[i].Kind}</span>
                <h5>${products_[i].ProductName}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>₪${products_[i].Price}</h4>
            </div>
            <div id="add-to-cart">
                <button class="btn123" id='${products_[i].ProductName}' onclick="addToCart('${products_[i].ProductName}', '${products_[i].Kind}', '${products_[i].Price}', '1')">Add to Cart</button>
            </div>`;
            productHTML+=`</div>`;
            }
            
        }
        
        productContainer.innerHTML = productHTML;
  }

   
}


{
    var uJSON = sessionStorage.getItem('UserSignIn');
    var u = JSON.parse(uJSON);
    if(u.Name=="admin"){
        var Add_Product = document.getElementById("AddP_admin");
        Add_Product.innerHTML = `<button type="button" id="btnAddProduct" style="background-color: #4CAF50; color: white; padding: 10px 20px; font-size: 16px; border: none; border-radius: 4px; cursor: pointer;" onclick="addNewProduct()">Add Product +</button>
        `;
    }
}


function addNewProduct(){
    window.location.href = "/addProduct";

    ///////////////////////////////////////////////
}
/*
var username = "admin";
var password = "admin";

var xhrr = new XMLHttpRequest();
xhrr.open('GET', 'http://localhost:3000/api/Users?userName=' + username, true);

xhrr.onload = function () {
  if (xhrr.status >= 200 && xhrr.status < 400) {
    var detailsdata = JSON.parse(xhrr.responseText);
    //res.render('login', { login: detailsdata });
    //req.session.username = username;
    console.log(detailsdata);
  } else {
    //res.send('Error: ' + xhrr.status);
  }
};

 
xhrr.send();
*/