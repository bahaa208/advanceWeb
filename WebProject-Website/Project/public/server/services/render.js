const axios = require('axios');


exports.homeRoutes = (req,res)=>{
    res.render('mainPage');
}

exports.products = (req,res)=>{
    axios.get('http://localhost:3000/api/products')
    .then(function(response){
        res.render('Products',{products:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
}




exports.cart = (req,res)=>{
    
    axios.get('http://localhost:3000/api/orders')
    .then(function(response){
         
        
        res.render('cart',{orders:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

 


exports.orders = (req,res)=>{
    axios.get('http://localhost:3000/api/details')
    .then(function(response){
        
        res.render('ordersReadyToGo',{details :response.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

exports.UpdateDetails = (req,res)=>{
    axios.get('http://localhost:3000/api/details/'+req.query.id)
    .then(function(detailsdata){
        res.render('UpdateDoneOrder',{details :detailsdata.data });
    })
    .catch(err=>{
        res.send(err);
    })
}




exports.login = (req, res) => {
    

    res.render('signUp');

     
};


exports.login_signIn = (req, res) => {
    

    res.render('signIn');

     
};

exports.newPro = (req, res) => {
    

    res.render('addProduct');

     
};