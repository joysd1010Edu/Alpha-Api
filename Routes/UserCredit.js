const express = require('express');
const router = express.Router();
const Laptop = require('./../Models/LaptopModel');
const UserCredit = require('./../Models/UserCredentialModel');

router.get("/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await UserCredit.findOne({ uid: uid });
        console.log('User credit:', user?.credit);
        if (!user?.uid || user?.uid == undefined) {
            res.status(200).json({ message: "uid is unique" , changeID: false});
        }
        else {
            res.status(201).json({ message: "uid exist", changeID: true });
        }

    } catch (error) {
        console.error("Error fetching laptops:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/email/:email", async (req, res) => {
    try {
        const { email } = req.params;
        console.log(email)
        const user = await UserCredit.findOne({ email: email });
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching laptops:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/", async (req, res) => {
try {
    const { uid, credit, email, username } = req.body;
    const user = await UserCredit.findOne({ email: email });
    if (user?.email == email) {
        res.status(200).json({ message: "Email already exists" , success:true});
    }
    else {
        const newUser = new UserCredit({ uid, credit, email, username });
        await newUser.save();
        res.status(201).json({ message: "User data posted successfully", success:true });
    }
    
} catch (error) {
    console.error("Error posting user data:", error);
    res.status(500).json({ message: "Server error" });
}

})
    



module.exports = router;