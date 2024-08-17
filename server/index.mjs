import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import kpiRoutes from "./routes/kpi.mjs";
import productRoutes from "./routes/product.mjs";
import transactionRoutes from "./routes/transaction.mjs";

// import KPI from "./models/KPI.mjs";
// import Product from "./models/Product.mjs";
// import Transaction from "./models/Transaction.mjs";
// import { kpis, products, transactions } from "./data/data.mjs";


/* CONFIGURATIONS */
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;

mongoose
    // .connect(process.env.MONGO_URL
    //  , {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // }
    // )
    .connect(process.env.MONGO_URL)
    .then(async () => {
        app.listen(PORT, () => console.log(`Server Port: ${ PORT }`));

        /* ADD DATA ONLY ONCE OR WHEN IT IS NEEDED */
        // await mongoose.connection.db.dropDatabase(); // to avoid duplicate database
        // KPI.insertMany(kpis);
        // Product.insertMany(products);
        // Transaction.insertMany(transactions);
    })
    .catch((error) => console.log(`${ error } did not connect`));
