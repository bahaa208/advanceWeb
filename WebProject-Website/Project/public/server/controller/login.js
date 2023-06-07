var usersdb = require('../model/loginmodel');



//create and save new user
exports.create=(req,res)=>{ 
    if(!req.body){
        res.status(400).send({ message : "user  cant be empty!"});
        return;
    }

    // new user
    const user = new usersdb({
        
        userName : req.body.userName,
        pass : req.body.pass,
        address : req.body.address,
        phoneNumber : req.body.phoneNumber
    })

    // save order in the database
    user
        .save(user)
        .then(data => {
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });
}

//retrieve and return all details or a single details
exports.find = (req, res) => {
  if (req.params.id) {
    const id = req.params.id;
    usersdb
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
     
    usersdb
      .find({ userName: req.params.name })
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
  