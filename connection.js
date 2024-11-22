import mongoose from "mongoose";

async function connectToMongoDb(url) {
    await mongoose.connect(url)
            .then(() => console.log("connected to mongoDb"))
            .catch((error) => console.log({message : error.message}))
}

export {
    connectToMongoDb
};
