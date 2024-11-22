import express from 'express';
import { authLogin } from '../middlewares/validate.js';
import { handleDisplayAnalytics, handleRedirectUrl, handleShortUrlGenerate } from './UrlController.js';


const router = express.Router()


router.post("/", authLogin, handleShortUrlGenerate);
router.get("/", authLogin, handleRedirectUrl)
router.get("/analytics",  authLogin, handleDisplayAnalytics)


export {
    router
};
