    import express from "express"
    import "dotenv/config"
    import connectDB from "./utils/connectDB.js";
    import authRoutes from "./routes/auth.route.js";
    import messageRoutes from "./routes/message.route.js";
    import cookieParser from "cookie-parser";
    import { arcjetMiddleware } from "./middlewares/arcjet.middleware.js";

    const app = express();
    const PORT = process.env.PORT || 8000;

    app.get("/", (req, res) => {
        res.send("Hello from the backend");
    })


    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cookieParser());

    // app.use(arcjetMiddleware);

    // routes
    app.use("/api/auth", authRoutes);
    app.use("/api/message",messageRoutes);
    app.use("/api/groupMessage",groupMessageRoutes);

    app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDB();

    })

