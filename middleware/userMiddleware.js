import jwt from "jsonwebtoken";

export const Middleware = async (req, res, next) => {
    req.headers.authorization && req.headers.authorization.startsWith("Bearer");
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
        return res.status(403).json({ message: "Token is required" });
    }
    await jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
        if (err) {
            return res.status(403).json("You are not Authorized")
        }
        req.user = user;
        next();
    })
}