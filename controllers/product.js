import product from "../models/productmodel.js";


export const createNewProduct = async (request, response) => {
    try {
        const { name, price, quantity, description, user } = request.body;
        console.log(name, price, quantity, description);
        const isproductexisted = await product.findOne({ name: name });
        if (isproductexisted) {
            return response.status(400).json({ message: "Product Name Already Existed" })
        }
        const productData = new product({
            name,
            price,
            quantity,
            description,
            user
        })
        await productData.save();
        return response.status(200).json({
            success: true,
            message: "Product Added",
            productData
        })
    }
    catch (error) {
        return response.status(500).json(error.message)
    }
}

export const getProducts = async (request, response) => {
    try {
        const getProducts = await product.find();
        return response.status(200).json({
            success: true,
            getProducts
        })
    } catch (error) {
        return response.status(500).json(error.message)
    }
}

export const getProductByName = async (request, response) => {
    try {
        const getProductname = request.params.name;
        const productData = await product.findOne({ name: getProductname })
        if (!productData) {
            return response.status(404).json({
                message: "Product Not Found"
            })
        }
        return response.status(200).json({
            success: true,
            productData
        })
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const deleteProductByName = async (request, response) => {
    try {
        const getProductname = request.params.name;
        const productData = await product.findOneAndDelete({ name: getProductname });
        if (!productData) {
            return response.status(404).json({ message: "Product Not Found" });
        }
        console.log("Product Deleted Successfully");
        return response.status(200).json({
            message: "Product Deleted Successfully",
            success: true
        })
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const updateProductByName = async (request, response) => {
    try {
        const getProductName = request.params.name;
        const productData = await product.findOneAndUpdate({ name: getProductName }, request.body);
        if (!productData) {
            return response.status(404).json({ message: "Product Not Found" });
        }
        console.log(productData);
        return response.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            productData
        })
    } catch (error) {
        return response.status(500).json(error.message);
    }
}


export const getProductsByUserId = async (request, response) => {
    try {
        const getUserId = request.params.id;
        const productData = await product.find({ user: getUserId }).populate("user");
        // const productData = await product.find().populate("user");
        return response.status(200).json({
            success: true,
            productData,
            message: "GOT PRODUCTS BY USER ID"
        })
    } catch (error) {
        return response.status(500).json(error.message)
    }
}