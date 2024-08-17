import express from "express";

import Transaction from "../models/Transaction.mjs";


const router = express.Router();

router.get("/transactions", async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .limit(50)
            .sort({ createdOn: -1 }); // sort by latest (means latest top 50 only)
            
        res.status(200).json(transactions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


export default router;
