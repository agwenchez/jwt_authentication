const express = require('express');
const router = express.Router();
const Item = require('../../models/Items');
const auth = require('../../middleware/auth')



//get all items
router.get('/', (req,res)=>{
    Item.find()
    .sort({ dare: -1 })
    .then(items => res.json(items));
})


// router.post('/', auth, (req, res) => {
//     const newItem = new Item({
//       name: req.body.name
//     });
  
//     newItem.save().then(item => res.json(item));
//   });
  
//post new items
router.post('/', auth, (req,res)=>{

    const newItem = new Item({
        name:req.body.name
    })

    newItem.save().then(item => res.json(item));
})

//delete item
router.delete('/:id',auth, (req,res)=>{
    Item.findById(req.params.id)
    .then(item=> item.remove().then(()=> res.json({success: true }) ))
    .catch(err => res.status(404).json({success: false }));
})

module.exports = router;