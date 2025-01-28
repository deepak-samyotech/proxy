import express from 'express';
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

const app = express();
app.use(express.json());

const proxyAgent = new HttpsProxyAgent(
    'https://spiukqgpay:_frk7JG2Hk8zkCxlq4@gate.smartproxy.com:10001'
);


app.post('/proxy', async (req, res) => {
    try {
        const firebaseFunctionUrl = 'https://us-central1-tellevo-cubataxi.cloudfunctions.net/checksmtpdetails';

        const userIp = req.headers['x-forwarded-for']
            ? req.headers['x-forwarded-for'].split(',')[0]
            : req.connection.remoteAddress;

        console.log("User IP Address: ", userIp);

        console.log("req body-----", req.body);
        console.log("proxy agent ", proxyAgent);
        //   res.send(proxyAgent);
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: {
                'Content-Type': 'application/json',
            },
            agent: proxyAgent,
        };

        const response = await fetch(firebaseFunctionUrl, fetchOptions);

        if (response.ok) {
            const responseData = await response.json();
            res.status(response.status).json(responseData);
        } else {
            const errorData = await response.json();
            res.status(response.status).json(errorData);
        }
    } catch (error) {
        console.error('Error:', error);

        res.status(500).json({ error: 'Proxy server encountered an issue.' });
    }
});

app.get('/getserverTime', async (req, res) => {
    try {
        const firebaseFunctionUrl = 'https://us-central1-tellevo-cubataxi.cloudfunctions.net/getservertime';

        const userIp = req.headers['x-forwarded-for']
            ? req.headers['x-forwarded-for'].split(',')[0]
            : req.connection.remoteAddress;

        console.log("User IP Address: ", userIp);

        console.log("req body-----", req.body);
        console.log("proxy agent ", proxyAgent);
        //   res.send(proxyAgent);
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            agent: proxyAgent,
        };

        const response = await fetch(firebaseFunctionUrl, fetchOptions);

        if (response.ok) {
            const responseData = await response.json();
            res.status(response.status).json(responseData);
        } else {
            const errorData = await response.json();
            res.status(response.status).json(errorData);
        }
    } catch (error) {
        console.error('Error:', error);

        res.status(500).json({ error: 'Proxy server encountered an issue.' });
    }
})

const PORT = 8000;
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
