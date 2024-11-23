const express = require('express');
const router = express.Router();
const Laptop = require('./../Models/LaptopModel');
const UserCredit = require('./../Models/UserCredentialModel');
const stripe = require("stripe")(process.env.PAYMENT_SECREAT);

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

router.patch("/update/:email/:credit", async (req, res) => {
    try {
      const { email, credit } = req.params; 
      const newCredit = parseInt(credit, 10); 
  
      
      if (isNaN(newCredit) || newCredit < 0) {
        return res.status(400).json({ message: "Invalid credit value" });
      }
  
      
      const user = await UserCredit.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate the updated credit
    const updatedCredit = user.credit + newCredit;

    // Update the user's credit
    user.credit = updatedCredit;
    await user.save(); // Save the updated document

    res.status(200).json({
      message: "Credit updated successfully",
      user: user,
      updated: true,
    });
    } catch (error) {
      console.error("Error updating credit:", error);
      res.status(500).json({ message: "Server error" });
    }
  });



const createPayment = async (req, res) => {
    const { Price } = req.body;
    const amount = Price * 100;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types: ["card"],
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).send({ error: "Error creating payment intent" });
    }
};

router.post("/pay", createPayment);

module.exports = router;