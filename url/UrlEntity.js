import mongoose from "mongoose";


const urlSchema = mongoose.Schema({
    orginalUrl : {
        type : String,
        required : true
    },
    shortUrl : {
        type : String,
        required : true,
        unique : true
    },
    analytics : [{
        timeStamp :  Number
    }]
}, {timestamps : true});

const URL = mongoose.model('urls', urlSchema);

export {
    URL
};
