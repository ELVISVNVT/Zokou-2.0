const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0N2RjFDUnZZV09MYVRjUm5sc3BDeHNLaGZOeEtBQ1ZhRC9TR2xjTDQxQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSTJYUFNuTzErUVdvd3JEdmZibVk3L25HSm42YURIMkJna2tuTllORUdoYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVTjczOGtPY3N3WEFqNFdDV2RLMm1zczFtRFlvQTdSUlFsREwrVXVJWG1rPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGS1Y1QVRzRWRXTVlBVGQ4OWVob1EwWmJQcFU0OTlhaUJQb3hyZEo5UlJFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdIQjlhOUdLTnhsUmxPSVVIWVlrTFdva280VVNucDVlcW90UVlvMU40bjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhNcDNOSHkyTzdqdk03V1k2NURXQUh2L05TeWtUZzBmdUJQdmJ6NTd2SHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU9ubW5oWnozS2c5TGhNd3JzNlN2eW5MOHpoL1ljNzNwU2Z3TVQ2WUZYOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVkZBMnJibE92OFBoRnhicE9hMnc3c0trdVNhOXBlSnNWNFdHdWRuMXMwcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNCeHViM1A4cUdOaHd5amFiVlNQU2JEbDFxd2RnbFFpNWpkaTJOZ3gzb0hVV0piVFFNNjBVZjdLOGFsdGRDN3M3bHNoQlB3Nmh5ZVlyZlVOVmUzcWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE2LCJhZHZTZWNyZXRLZXkiOiJzWjJVREkvSnlLblAwR2QzV1RPRFZDWnFydG5DTGtWRWFqUDJKWHpYNHJJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiSDUxSkhDMTEiLCJtZSI6eyJpZCI6IjIyODk4MDcwODg3OjM0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdl6nwnZeh8J2XqfCdl6cgIHzwnZO88J2TrvCdk7vwnZO/8J2TsvCdk6zwnZOuVlBTIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQMnZ4T01FRUl5cHY3NEdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIybUJRRE1tQ0M3NnYvaVEvL2NlN2FUT2NIN3c5a1FrRG45UlJDOVB6TGprPSIsImFjY291bnRTaWduYXR1cmUiOiI4NU1TR2xhNE9Dalk1citNMW13ZlJTeWt1WVQxQW5nbThndkV5cnF6enRqdlFYV29aWHJiRlJrSVVQTmQ2eGtjVUZHamVnSmJzaGlxeXcvdFpaLytDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoidm1QWlk1aUJXQmFrTUF1a2wzeENzWll2Y3BVNGtPK2RjZ000UzRzN1NLM3l3REQ0b2ZxeUZSMStlVFkySFRDWVRlNWxrYytkODJ3MDFVWVJMSDhGamc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjg5ODA3MDg4NzozNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkcGdVQXpKZ2d1K3IvNGtQLzNIdTJrem5CKzhQWkVKQTUvVVVRdlQ4eTQ1In19XSwicGxhdGZvcm0iOiJzbWJhIn0=',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
