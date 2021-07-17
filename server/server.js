const puppeteer = require("puppeteer");
const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require('fs')


const app = express();

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

app.post("/screenshot", async (req, res) => {

    const ID = (new Date().getTime().toString(36))
    const loc = "./public/screenshots/" + ID + ".png"

    // Start browsers
    const browser = await puppeteer.launch({
        defaultViewport: {
            width : 1920,
            height : 1080
        },
        ignoreDefaultArgs : ['--disable-extensions']
    });

    // Dosyayı aç
    const page = await browser.newPage()
    await page.goto(req.body.url)

    // Ekran görüntüsünü al
    await page.screenshot({ path : loc, fullPage: true })

    await browser.close()

    res.json({
        success : true,
        ID
    })

});


app.listen(5000, () => {
  console.log("server started port 5000");
});
