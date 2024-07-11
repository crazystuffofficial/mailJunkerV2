import express from 'express';
import fs from 'fs';
import fetch from "node-fetch";
import { dirname } from 'splendid-ui/node'
const __dirname = dirname(import.meta.url);
const app = express();
var num = 0;
var errs = 0;

function createDirectory(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }
}

function spam(theemail, path) {
    fetch('https://www.cbsnews.com/newsletters/xhr/signup', {
        method: 'POST',
        headers: {
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'text/plain',
            'cookie': 'OTGPPConsent=DBABLA~BVQqAAAAAgA.QA; fly_vid=40d43529-820f-43b2-87e1-b0df430580f2; usprivacy=1YNN; optimizelyEndUserId=oeu1717445080655r0.7905935851424593; _cb=B9-8OXCM-4FBCOjQ7L; s_ecid=MCMID%7C51926034555642537863534432191948189861; _pubcid=8080a9ee-afc5-4df8-bca4-89735e3392cc; trc_cookie_storage=taboola%2520global%253Auser-id%3D4a041288-8518-4bff-839e-d593b13a869f-tuctd4804f5; AAMC_cbsi_0=REGION%7C7; _chartbeat2=.1717445080778.1717449978461.1.BOzulcDy8_fvDqwnqcDE3TM4BN5xX7.1; cto_bundle=LToL6V83SHRwOXVjS24xOWEzQjNIWmpzOWxlREhKOFhRRjRlUzVyb0VxUk5TQUg1WDczd3MyTHdmVFNSYTBuVEZIJTJCNVhCRlRPZE0xd2ZGdkF3eXklMkJCc2VnazVycGR6VkVscGEwNXBRazg5QXViZkNlb2VYaFRwRDZJSW9iZHR0WDZPNnhYWWJrZ2Y1Y012T3l2b1l3NEdwamR3JTNEJTNE; cto_bidid=ppZctl9NUjBKNUtnT20wMGRNa2w5YnlRSmdia0VLZkY0MDVrUEVwalhjYmZhQ2U0OHFHVSUyQjJTMTRyc3QxMzY4UHI2M0ElMkZYQkVIOHNoQnRVU3dUem5lS1E0cEhTdSUyQnBSTlZqT0VHaDBzZmhORWppdyUzRA; muxData=mux_viewer_id=e4da8dec-f3e9-43b2-ab32-fe11b729e3f5&msn=0.67552805435716&sid=85cce011-5f16-4513-bbd1-032ef2b62467&sst=1717709518003&sex=1717711019764; fly_device=desktop; fly_geo={"countryCode": "IN", "region": "MH", "dma": "356002", "connection": { "type": "broadband"}}; CBS_INTERNAL=0; fly_js_debug=[]; first_page_today=false; s_vnum=1723215375141%26vn%3D1; s_invisit=true; s_lv_cbsnews_s=More%20than%2030%20days; AMCVS_10D31225525FF5790A490D4D%40AdobeOrg=1; s_cc=true; _BB.bs=b|3; _BB.d=1|||1; _pubcid_cst=zix7LPQsHA%3D%3D; _lr_retry_request=true; _lr_env_src_ats=false; PHPSESSID=ho0u7feopjj1htn5gch31npure; prevPageType=user_nl_subscription; prevPageName=cbsnews:/newsletters/; QSI_HistorySession=https%3A%2F%2Fwww.cbsnews.com%2Fnewsletters%2F~1720623397016; CBSNEWS.features.smart-banner-SB_breaking-news=%7B%22type%22%3A%22permanent%22%2C%22value%22%3A%22visible%22%7D; OptanonConsent=isGpcEnabled=0&datestamp=Wed+Jul+10+2024+20%3A27%3A05+GMT%2B0530+(India+Standard+Time)&version=202401.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=4cbd3e9e-d07a-43b6-a9e4-2c9025000c72&interactionCount=1&landingPath=NotLandingPage&GPPCookiesCount=1&groups=1%3A1%2C5%3A1%2C4%3A1%2C2%3A1%2C3%3A1&AwaitingReconsent=false&genVendors=V16%3A0%2CV10%3A0%2CV12%3A0%2CV9%3A0%2CV15%3A0%2CV6%3A0%2CV8%3A0%2CV5%3A0%2CV7%3A0%2CV11%3A0%2C&geolocation=IN%3BMH; OptanonAlertBoxClosed=2024-07-10T14:57:05.485Z; _awl=2.1720623429.5-bc04ea96466a615fdd2507b2ffffaa29-6763652d75732d6561737431-3; utag_main=v_id:018fdfb43607001516817e7745100506f001806700bd0$_sn:3$_se:6$_ss:0$_st:1720625234862$vapi_domain:cbsnews.com$ses_id:1720623375104%3Bexp-session$_pn:5%3Bexp-session; s_getNewRepeat=1720623434867-New; s_lv_cbsnews=1720623434867; s_sq=%5B%5BB%5D%5D; AMCV_10D31225525FF5790A490D4D%40AdobeOrg=1075005958%7CMCIDTS%7C19915%7CMCMID%7C51926034555642537863534432191948189861%7CMCAAMLH-1718053855%7C7%7CMCAAMB-1720623374%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1720630634s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C4.4.1',
            'dnt': '1',
            'origin': 'https://www.cbsnews.com',
            'priority': 'u=1, i',
            'referer': 'https://www.cbsnews.com/embed/newsletters/widget?v=2287029998c5246c93d6dd038eb30603&subs=m40186',
            'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
        },
        body: '{"email":"' + theemail + '","sub":"m40186,m40183","token":"vDZ3zu26GBfyrHadfFbi0Zvnhfsa_jsBAyPrIbgcy3I","mCodeOptin":"m40183"}'
    }).catch(function(e) {
        errs++;
        fs.appendFile(path + '/errmessages.txt', e.message + "\n", (err) => {
            if (err) {
                console.error('Error appending data:', err);
            } else {

            }
        });
    }).then(function(response) {
        num++;
        fs.writeFileSync(path + '/num.txt', num.toString());
        fs.writeFileSync(path + '/errs.txt', errs.toString());
    });
}
app.use(express.static("static"));
app.get('/sendMail/:id1/:id2/index.html', (req, res) => {
    try {
        errs = 0;
        num = 0;
        const id1 = atob(req.params.id1);
        const id2 = atob(req.params.id2);
        const theemail = id1;
        const times = Number(id2);
        createDirectory(__dirname + "/sendMail");
        createDirectory(__dirname + "/sendMail/" + req.params.id1);
        createDirectory(__dirname + "/sendMail/" + req.params.id1 + "/" + req.params.id2);
        fs.writeFileSync(__dirname + req.url.slice(0, req.url.length - 11) + '/num.txt', "Loading...");
        fs.writeFileSync(__dirname + req.url.slice(0, req.url.length - 11) + '/errmessages.txt', "");
        for (var i = 0; i < times; i++) {
            spam(theemail, __dirname + req.url.slice(0, req.url.length - 11));
        }
        res.sendFile(__dirname + '/spamPages/spam.html');
    } catch (e) {
        res.status(500).send("Sorry, but there was an error. Maybe you put too big of a number. \n\n\n\n" + e);
    }
});
app.get('/sendMail/:id1/:id2/:id3', (req, res) => {
    res.sendFile(__dirname + req.url);
});
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
