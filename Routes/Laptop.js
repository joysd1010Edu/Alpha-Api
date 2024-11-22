const express=require('express');
const router = express.Router();
const Laptop = require('./../Models/LaptopModel');
const UserCredit= require('./../Models/UserCredentialModel');

router.get("/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        console.log("Fetching laptops...");
        const user = await UserCredit.findOne({uid: uid});
        // console.log('User:', user);
        console.log('User credit:', user.credit);
    } catch (error) {
        console.error("Error fetching laptops:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/:id/:uid", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Fetching laptops key length...");
        const laptop = await Laptop.findOne({_id: id});
        console.log("Fetched ", Object.keys(laptop).length, 'data'); // Log fetched data
        res.status(200).json(laptop);
    } catch (error) {
        console.error("Error fetching laptops:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
