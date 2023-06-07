const axios = require('axios');


exports.homeRoutes = (req,res)=>{
    res.render('index');
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
    
    axios.get('http://localhost:3000/api/orders/'+"admin")
    .then(function(response){
         
        
        res.render('cart',{orders:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

exports.details = (req,res)=>{
    //make a get request to /api/orders
    axios.get('http://localhost:3000/api/details/'+"admin")
    .then(function(response){
        
        res.render('details',{details :response.data});
    })
    .catch(err=>{
        res.send(err);
    })
}


exports.orders = (req,res)=>{
    axios.get('http://localhost:3000/api/details/'+"admin")
    .then(function(response){
        
        res.render('orders',{details :response.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

exports.UpdateDetails = (req,res)=>{
    axios.get('http://localhost:3000/api/details/'+req.query.id)
    .then(function(detailsdata){
        res.render('UpdateDetails',{details :detailsdata.data });
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