const ftp = require("basic-ftp");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const xml2js = require("xml2js");

const app = express();
app.use(cors());
app.use(express.json());

const FTP_CONFIG = {
    host: "127.0.0.1",
    user: "user1",
    password: "123",
    secure: true,
    secureOptions: { rejectUnauthorized: false }, // Acepta certificados autofirmados
    port: 21,
};

const XML_FILE_PATH = "bars.xml";

app.get("/bars", async (req, res) => {
    const client = new ftp.Client();
    try {
        await client.access(FTP_CONFIG);

        // Descargar el archivo XML desde el servidor FTP
        await client.downloadTo(XML_FILE_PATH, XML_FILE_PATH);

        // Leer y parsear el archivo XML
        const xmlData = fs.readFileSync(XML_FILE_PATH, "utf8");
        xml2js.parseString(xmlData, (err, result) => {
            if (err) {
                console.error("Error parsing XML:", err);
                return res.status(500).send("Failed to parse XML file.");
            }

            // Enviar los datos parseados al frontend
            res.json(result.bars.bar); // Se asume que el XML tiene una estructura <bars><bar>...</bar></bars>
        });
    } catch (err) {
        console.error("Error accessing FTP server:", err);
        res.status(500).send("Failed to fetch data from FTP server.");
    } finally {
        client.close();
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
