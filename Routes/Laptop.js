const express = require('express');
const router = express.Router();
// const Laptop = require('./../Models/LaptopModel');
const UserCredit = require('./../Models/UserCredentialModel');

router.get("/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        console.log("Fetching laptops...");
        const user = await UserCredit.findOne({ uid: uid });
        console.log('User credit:', user?.credit);
        if (user?.credit <= 0 || !user?.credit || user?.credit == undefined) {
            res.status(200).json({ message: "You have no credit left" });
        }
        else {
            const laptops = await Laptop.find();
            const userCredit = await UserCredit.findOneAndUpdate({ uid: uid }, { $set: { credit: user.credit - 1 } }, { new: true });
            console.log("Fetched ", laptops.length, 'laptops'); // Log fetched data
            res.status(200).json(laptops);
        }

    } catch (error) {
        console.error("Error fetching laptops:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/:id/:uid", async (req, res) => {
    try {
        const { id } = req.params;
        const { uid } = req.params;
        const user = await UserCredit.findOne({ uid: uid });
        console.log('User credit:', user?.credit);
        console.log("id:", id, "uid:", uid);
        if (user?.credit <= 0 || !user?.credit || user?.credit == undefined) {
            res.status(200).json({ message: "You have no credit left" });
        }
        else {
            const laptops = await Laptop.find();
            await UserCredit.findOneAndUpdate({ uid: uid }, { $set: { credit: user.credit - 1 } }, { new: true });
            console.log("Fetching laptops key length...");
            const laptop = await Laptop.findOne({ _id: id });
            console.log("Fetched ", Object.keys(laptop).length, 'data'); // Log fetched data
            res.status(200).json(laptop);
        }


    } catch (error) {
        console.error("Error fetching laptops:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
