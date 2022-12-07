const Pet = require("../modeles/pet");
const User = require("../modeles/user");


exports.getPets = async (req, res) => { 

    const pets = await Pet.find();
    
    if(!pets) {
        return res.status(400).send({
            status: 'fail'
        });
    }
    res.send({
        status: "succes",
        data: {
            pets
        }
    });
};

exports.getPet =  async(req, res) => {
    const petId = req.params.id;

    const pet = await Pet.findById(petId);

    if(!pet){
        return res.status(404).send({
            status: "not found"
        });
    }

    res.status(200).send({
        status: "succes",
        data: {
            pet
        }
    });
};

exports.createPet = async(req, res) => {
   
    const currentUser = req.currentUser;

    const pet  = new Pet({
        name : req.body.name,
        gender: req.body.gender,
        owner: currentUser.email,
        adress: req.body.adress,
        phone: req.body.phone
    });
    

    await pet.save();
    
    res.status(201).send(pet);
}

exports.updatePet = async (req, res) => {

    const pet = await Pet.findById(req.params.id);

    console.log(pet);
    if(!pet){
        return res.status(404).send({
            status: "not found"
        });
    }

    const updatedPet = req.body;

    const user = await User.findOne({email:pet.owner});

    if(user.email !== req.currentUser.email) {
        return res.send({
            status:'not allowed'
        })
    }

    await Pet.findByIdAndUpdate(req.params.id, updatedPet);

    res.status(200).send({
        status: "succes",
        data: {
            updatedPet
        }
    });

};

exports.deletePet = async (req, res) => {

    const pet = await Pet.findById(req.params.id);
    const user = await User.findOne({email:pet.owner});
 
    if(!pet){
        return res.status(404).send({
            status: ' not found'
        });
    }

    if(user.email !== req.currentUser.email) {
        return res.send({
            status:'not allowed'
        })
    }

    await Pet.findByIdAndDelete(req.params.id);

    res.status(200).send({
            status: "succes"
    });
    
};

    

    

