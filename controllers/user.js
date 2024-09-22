import usermodal from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// export const postUserData = async (request, response) => {
//     try {
//         const { name, username, email, password } = request.body;
//         console.log(name, username, email, password);
//         const isemailexisted = await user.findOne({ email: email });
//         if (isemailexisted) {
//             return response.status(400).json({ message: "Email already exists" });
//         }
//         const userData = new user({
//             name,
//             username,
//             email,
//             password
//         })
//         await userData.save();
//         return response.status(200).json({
//             message: "Data Saved Successfully",
//             success: true,
//             userData
//         })
//     } catch (error) {
//         return response.status(500).json(error.message);
//     }
// }

// export const getUserData = async (request, response) => {
//     try {
//         const getUsers = await user.find();
//         return response.status(200).json({ success: true, getUsers });
//     } catch (error) {
//         return response.status(500).json(error.message);
//     }
// }

// export const getUserbyId = async (request, response) => {
//     try {
//         const getUserId = request.params.id;
//         const userData = await user.findById(getUserId);
//         if (!userData) {
//             return response.status(404).json({ message: "User Not Found" });
//         }

//         return response.status(200).json({ success: true, userData, message: "GOT USER DATA" });
//     } catch (error) {
//         return response.status(500).json(error.message);
//     }
// }

// export const deleteUser = async (request, response) => {
//     try {
//         const getUserId = request.params.id;
//         const userData = await user.findByIdAndDelete(getUserId);
//         if (!userData) {
//             return response.status(404).json({ message: "User Not Found" });
//         }
//         console.log("USER DELETED SUCCESSFULLY")
//         return response.status(200).json({

//             message: "User Deleted Successfully",
//             success: true,
//         })

//     } catch (error) {
//         return response.status(500).json(error.message);
//     }

// }

// export const updateUser = async (req, res) => {
//     try {
//         const getUserId = req.params.id;
//         const userData = await user.findByIdAndUpdate(getUserId, req.body);
//         if (!userData) {
//             return res.status(404).json({ message: "User Not Found" });
//         }
//         console.log(req.body);
//         return res.status(200).json({
//             success: true,
//             message: "USER Updated Successfully",
//             userData
//         });
//     }
//     catch (error) {
//         return res.status(500).json(error.message);
//     }
// }


//register api
export const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        const User = await usermodal.create(userData);
        return res.json({
            message: "User registered successfully",
            User
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }

}

//login api with jwt

export const loginUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = await usermodal.findOne({ email: userData.email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }
        const isValidPass = await bcrypt.compare(userData.password, user.password);
        if (!isValidPass) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        const jwttoken = jwt.sign({ id: user.id, role: user.role, name: user.name, password: user.password }, process.env.PRIVATE_KEY, { expiresIn: "5m" });
        //cookie
        res.cookie("jwt", jwttoken, { httpOnly: true, secure: true, maxAge: 5 * 60 * 60 })
        return res.status(200).json({
            message: "Login Successful",
            token: jwttoken,
            userData
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


//logout api with jwt

export const logoutUser = async (req, res) => {
    try {
        console.log("000000", req.user)
        res.clearCookie("jwt");
        return res.json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
export const getUser = async (req, res) => {
    try {
        const getData = await usermodal.find();
        return res.status(200).json({ message: "HELLOO DATA GOT", getData });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}