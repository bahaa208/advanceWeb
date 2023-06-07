var orderdb = require('../model/model');

//create and save new order
exports.create=(req,res)=>{ 
    if(!req.body){
        res.status(400).send({ message : "Order can not be empty!"});
        return;
    }
    //var nameUSerr = gett();
    //console.log(nameUSerr);
    orderdb.findOne({ProductName: req.body.ProductName,UserName: req.body.UserName, Kind: req.body.Kind}, function(err, order) {
        
        if (err) {
          console.error(err);
          console.log("An error occurred while checking the database. Please try again later.");
        } else if (order) {
          // If the product already exists, increase the quantity
          order.Quantity += parseInt(req.body.Quantity);
          order.save(function(err) {
            if (err) {
              console.error(err);
              console.log("An error occurred while updating the quantity in the database. Please try again later.");
            } else {
              console.log("Product quantity increased successfully!");
            }
          });
        } else {
          
            
          
          var newOrder = new orderdb({
            ProductName: req.body.ProductName,
            UserName:req.body.UserName,
            Kind: req.body.Kind,
            Price: req.body.Price,
            Quantity: req.body.Quantity
          });
          newOrder.save(function(err) {
            if (err) {
              console.error(err);
              console.log("An error occurred while adding the product to the database. Please try again later.");
            } else {
                console.log("Product added successfully!");
            }
          });
        }
      });
}

//retrieve and return all orders or a single order
exports.find = (req, res) => {
     
    if (req.params.id) {
      const id = req.params.id;
      orderdb
        .findById(id)
        .then((data) => {
          if (!data) {
            res.status(404).send({ message: "Not found order with id " + id });
          } else {
            res.send(data);
          }
        })
        .catch((err) => {
          res.status(500).send({ message: "Error retrieving order with id " + id });
        });
    } else if (req.params.name) {
       
      orderdb
        .find({ UserName: req.params.name })
        .then((orders) => {
          res.send(orders);
        })
        .catch((error) => {
          res.status(500).send({ message: error.message || "Error occurred while retrieving order details" });
        });
    } else {
      // Handle the case when neither id nor UserName is provided
      res.status(400).send({ message: "Invalid request. Please provide either id or UserName." });
    }
  };
  

//update a new order by order id
exports.update=(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to update can not be empty"})
    }

    const id = req.params.id;
    orderdb.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
    .then(data =>{
        if(!data){
            res.status(404).send({message:`Cannot update order with ${id}.Maybe user not found!`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error Update order information"})
    })

}

//delete a order with specified order id in the request



exports.delete = (req, res)=>{
    const id = req.params.id;

    orderdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                const id = req.body.id;
                orderdb.findByIdAndDelete(id).then(data =>{
                    if(!data){
                        res.status(404)("There is no product with this id :" + id)
                    }
                })
                
                
            }else{
                res.send({
                    message : "product was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete product with id=" + id
            });
        });
}