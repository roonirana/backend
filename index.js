// import http from "http";
// import fs from "fs";

// fs.writeFile("example.js", `rafce`, () => {
//     console.log("File Generated");
// });

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Hello World\n");
// })
// server.listen(3000, () => {
//     console.log('Server running on port 3000');
// });

// import express from "express";
// import fs from 'fs';


// fs.writeFile("EXPRESS SERVER.jsx", "SERVER IS CREATED BROOOOOO", () => {
//     console.log("File Generated");
// })
// const app = express();

// app.get("/hello", (req, res) => {
//     res.send('Hello World!');
// })
// app.listen(3000, () => {
//     console.log('Server running on port 5000');
// })

import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoute from "./routes/userroutes.js";
import productRoute from "./routes/productroutes.js";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());    
app.use(express.json());  // Built-in middleware for JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  // Redundant with express.json(), you may remove if not needed
// cookie parser
app.use(cookieParser());

app.use("/", userRoute);
app.use("/", productRoute);
connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {    
    console.log(`Server is running on http://localhost:${port}`);
});
