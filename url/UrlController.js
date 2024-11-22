import { nanoid } from "nanoid";
import { URL } from "./UrlEntity.js";

async function handleShortUrlGenerate(req, res) {

    if(!req.body || req.body.url==null || req.body.url == undefined){
        res.redirect("/error")
    }

    const actualUrl = req.body.url;
    
    let obj = await URL.findOne({orginalUrl : actualUrl})

    // console.log(obj)

    if(!obj){
        const nanoId = nanoid(8);
        obj = await URL.create({
            orginalUrl : actualUrl,
            shortUrl : nanoId
        });
    }


    res.json({url : req.body.url, shortUrl : obj.shortUrl})
}

async function handleRedirectUrl(req, res) {
    if(!req.body|| !req.body.shortId) {
        res.redirect("/error")
    }
    const shortId = req.body.shortId;

    const obj = await URL.findOneAndUpdate(
        {shortUrl : shortId},
        {
            $push: {
                analytics : 
                {
                    timeStamp : Date.now()
                }
            }
    })
    console.log(obj)

    if(!obj) {
        res.redirect("/error")
    }

    res.redirect(`https://${obj.orginalUrl}`)
}

async function handleDisplayAnalytics(req, res) {
    if(!req.body || !req.body.shortId) {
        res.redirect("/error")
    }

    const shortId = req.body.shortId;

    const obj = await URL.findOne({shortUrl : shortId}).select('analytics : 1')

    res.json(
        {
            numberOfTimesVisited : obj.analytics.length,
            visitedHistory : obj.analytics
        }
    )

}

export { handleDisplayAnalytics, handleRedirectUrl, handleShortUrlGenerate };

