import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
// import products from './data/products.js';
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import cors from "cors";

const port = process.env.PORT || 5000;

connectDB(); //connect to MongoDB

const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookies parser middleware
app.use(cookieParser());

app.use(cors());


app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);


//PAYPAL
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);


//FOR UPLOAD IMAGE
const __dirname = path.resolve(); //set __dirname to current directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  //any route that is not api will be redicted to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}else{
  app.get("/", (req, res) => {
    res.json("API running...");
  });
}

app.use(notFound);
app.use(errorHandler);

// app.get('/api/products', (req, res) => {
//     res.json(products)
// })

// app.get('/api/products/:id', (req, res) => {
//     const product = products.find((p) => p._id === req.params.id);
//     res.json(product);
// })

app.listen(port, () => console.log(`Server running on port ${port}`));
