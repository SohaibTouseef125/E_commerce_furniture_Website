"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const sanityClient_1 = require("./sanityClient");
const fetchData = async () => {
    try {
        const res = await fetch("https://template6-six.vercel.app/api/products");
        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.statusText}`);
        }
        const products = await res.json();
        for (const { title, imageUrl, price, tags, description, dicountPercentage, isNew, } of products) {
            try {
                const imageAsset = await upload(imageUrl);
                if (!imageAsset) {
                    console.warn(`Failed to upload image for product: ${title}`);
                    continue;
                }
                await sanityClient_1.client.create({
                    _type: "product",
                    title,
                    description,
                    price,
                    tags,
                    dicountPercentage,
                    image: {
                        _type: "image", // Use "image" as per schema
                        asset: {
                            _type: "reference",
                            _ref: imageAsset._id, // Use the uploaded image asset ID
                        },
                    },
                    isNew,
                });
                console.log("Migrated Product:", title);
            }
            catch (err) {
                console.error(`Failed to migrate product: ${title}`, err);
            }
        }
    }
    catch (error) {
        console.error("Error in fetchData:", error);
    }
};
exports.fetchData = fetchData;
const upload = async (image) => {
    try {
        const res = await fetch(image);
        if (!res.ok) {
            console.warn(`Failed to fetch image: ${image}`);
            return null;
        }
        const arrayBuffer = await res.arrayBuffer(); // Convert response to array buffer
        const buffer = Buffer.from(arrayBuffer); // Create a buffer for Sanity upload
        const contentType = res.headers.get("content-type") || "image/jpeg";
        const imageAsset = await sanityClient_1.client.assets.upload("image", buffer, {
            filename: image.split("/").pop() || "image",
            contentType,
        });
        return imageAsset;
    }
    catch (error) {
        console.error("Error in upload:", error);
        return null;
    }
};
(0, exports.fetchData)();
