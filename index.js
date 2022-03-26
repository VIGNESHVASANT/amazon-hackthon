const request = require("request-promise")
const cheerio = require("cheerio")
const fs = require("fs")
const json2csv = require("json2csv").Parser;


const amazon =["https://www.amazon.in/Apple-iPhone-13-Pro-128GB/dp/B09G99YPQM/ref=sr_1_1_sspa?crid=WL02IDXVU6WM&keywords=iphone+13+pro&qid=1648216209&sprefix=iphone+13+pro%2Caps%2C280&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFKTloyU0taS0ZXTDMmZW5jcnlwdGVkSWQ9QTAzNzYyNzVaOFA4RlBLQTA3NjcmZW5jcnlwdGVkQWRJZD1BMDg3NDQ4ODFTOEZVSDZOR0pXQUMmd2lkZ2V0TmFtZT1zcF9hdGYmYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl",
        "https://www.amazon.in/dp/B09G9FPGTN",
        "https://www.amazon.in/dp/B09V44MF6K?th=1",

];

(async() => {
    let amazonData =[]
    
    for (let amazon of amazons){
        const response = await request({
            uri: amazon,
            headers: {
                accept: 
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9",
            },
            gzip: true,
    
        });
    
        let $ = cheerio.load(response)
        let title = $('div [class="a-section a-spacing-none"] > h1').textContent.trim()
    
        let price = $('div [class="a-price a-text-price a-size-medium apexPriceToPay"] > span').textContent
    
        amazonData.push({
            title,
            price,
        });
    
    }
    const j2cp = new json2csv()
    const csv = j2cp.parse(amazonData)

    fs.writeFileSync("./amazon.csv", csv, "utf-8");




}
) ();