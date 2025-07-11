{\rtf1\ansi\ansicpg874\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require('express');\
const fetch = require('node-fetch');\
const cors = require('cors');\
\
const app = express();\
\
// \uc0\u3651 \u3594 \u3657  Middleware \u3648 \u3614 \u3639 \u3656 \u3629 \u3619 \u3633 \u3610  JSON \u3649 \u3621 \u3632 \u3648 \u3611 \u3636 \u3604 \u3651 \u3594 \u3657 \u3591 \u3634 \u3609  CORS\
app.use(express.json());\
app.use(cors()); // \uc0\u3629 \u3609 \u3640 \u3597 \u3634 \u3605 \u3651 \u3627 \u3657 \u3649 \u3629 \u3611  React \u3586 \u3629 \u3591 \u3588 \u3640 \u3603 \u3648 \u3619 \u3637 \u3618 \u3585 \u3617 \u3634 \u3652 \u3604 \u3657 \
\
// \uc0\u3604 \u3638 \u3591 \u3588 \u3656 \u3634 \u3592 \u3634 \u3585  Environment Variables \u3648 \u3614 \u3639 \u3656 \u3629 \u3588 \u3623 \u3634 \u3617 \u3611 \u3621 \u3629 \u3604 \u3616 \u3633 \u3618 \
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;\
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;\
\
// \uc0\u3626 \u3619 \u3657 \u3634 \u3591  Endpoint \u3626 \u3635 \u3627 \u3619 \u3633 \u3610 \u3619 \u3633 \u3610 \u3588 \u3635 \u3586 \u3629 \
app.post('/send-telegram', async (req, res) => \{\
    const \{ message \} = req.body;\
\
    if (!message) \{\
        return res.status(400).send(\{ error: 'Message content is required.' \});\
    \}\
\
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) \{\
        console.error('Telegram Token or Chat ID is not configured.');\
        return res.status(500).send(\{ error: 'Server configuration error.' \});\
    \}\
\
    // URL \uc0\u3586 \u3629 \u3591  Telegram Bot API\
    const url = `https://api.telegram.org/bot$\{TELEGRAM_BOT_TOKEN\}/sendMessage`;\
\
    const payload = \{\
        chat_id: TELEGRAM_CHAT_ID,\
        text: message,\
        parse_mode: 'Markdown', // \uc0\u3648 \u3614 \u3639 \u3656 \u3629 \u3651 \u3627 \u3657 \u3626 \u3634 \u3617 \u3634 \u3619 \u3606 \u3651 \u3594 \u3657 \u3605 \u3633 \u3623 \u3627 \u3609 \u3634  \u3605 \u3633 \u3623 \u3648 \u3629 \u3637 \u3618 \u3591 \u3652 \u3604 \u3657 \
    \};\
\
    try \{\
        const response = await fetch(url, \{\
            method: 'POST',\
            headers: \{\
                'Content-Type': 'application/json',\
            \},\
            body: JSON.stringify(payload),\
        \});\
\
        const data = await response.json();\
\
        if (data.ok) \{\
            res.status(200).send(\{ success: true, data \});\
        \} else \{\
            res.status(500).send(\{ success: false, error: data.description \});\
        \}\
    \} catch (error) \{\
        console.error('Error sending message to Telegram:', error);\
        res.status(500).send(\{ success: false, error: 'Failed to send message.' \});\
    \}\
\});\
\
const PORT = process.env.PORT || 3001;\
app.listen(PORT, () => \{\
    console.log(`Server is running on port $\{PORT\}`);\
\});\
\
// Export the app for serverless environments\
module.exports = app;}