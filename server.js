import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Routes from "./routes/index.js"
const app = express();
const PORT = process.env.PORT || 3000
dotenv.config()

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.get("/", (req, res) => {
    res.json({ message: "server is working..." })
})
app.use(Routes);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))