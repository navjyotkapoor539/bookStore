import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import bookRoute from "./route/book.route.js"
import Book from "./model/book.model.js";
import cors from "cors";
import userRoute from "./route/user.route.js"

const app = express();

app.use(cors());

app.use(express.json());

dotenv.config();  

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

try {
    mongoose.connect(URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log("Error:", error);
}

const importData=async ()=>{
    try{
        const data=JSON.parse(fs.readFileSync('list.json'));
        await Book.insertMany(data);
    }
    catch(error){
        console.log(error);
    }
}
importData();

app.use("/book",bookRoute);
app.use("/user",userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
