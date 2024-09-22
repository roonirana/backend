import express from "express"
import { getUser, loginUser, logoutUser, registerUser } from "../controllers/user.js";
import { Middleware } from "../middleware/userMiddleware.js";

const userRoute = express.Router();

// userRoute.post("/createUser", postUserData);
// userRoute.get("/getUser", getUserData);
// userRoute.get("/getUser/:id", getUserbyId);
// userRoute.delete("/deleteUser/:id", deleteUser);
// userRoute.put("/updateUser/:id", updateUser);
userRoute.post("/regUser", registerUser);
userRoute.post("/loginUser", loginUser);
userRoute.post("/logoutUser", Middleware, logoutUser)
userRoute.get("/getUser", Middleware, getUser)
export default userRoute;