const axios = require("axios");
const cheerio = require("cheerio");
exports.generate = async (req, res) => {
    const {province, city} = req.query;
    if (!province) {
        return res.status(400).json({error: '请选择省份'});
    }
    if (!city) {
        return res.status(400).json({error: '请选择城市'});
    }
    let operator = ''
    let phone = ''
    const phoneFont3All = await fetchData3(`https://telphone.cn/area/${city}/`)
    //随机归属地
    const operatorIndex = getRandomNumber(phoneFont3All.length)
    operator = phoneFont3All[operatorIndex].title
    //随机前三位
    const phone3Index = getRandomNumber(phoneFont3All[operatorIndex].sub.length)
    const phone3 = phoneFont3All[operatorIndex].sub[phone3Index]
    //随机前七位
    const phoneFont7All = await fetchData7(`https://telphone.cn/prefix/${city}${phone3}/`)
    const phone7Index = getRandomNumber(phoneFont7All[0].sub.length)
    const phone7 = phoneFont7All[0].sub[phone7Index]
    const phoneLast4 = getRandomNumber(9999, 4)
    phone = phone7 + phoneLast4
    res.json({phone, operator});
}
async function fetchData3(url) {
    const {data: html} = await axios.get(url);
    const $ = cheerio.load(html);
    const results = [];

    $('.list-box').each((index, element) => {
        const title = $(element).find('.title').text().trim();
        const titleList = ['中国移动', '中国联通', '中国电信']
        if (titleList.includes(title)) {
            const sub = [];

            $(element).find('.clearfix').find('a').each((i, el) => {
                //只保留数字
                const phone = $(el).text().trim().replace(/\D/g, '');
                sub.push(phone);
            });

            results.push({title, sub});
        }
    });
    return results;
}

async function fetchData7(url) {
    const {data: html} = await axios.get(url);
    const $ = cheerio.load(html);
    const results = [];

    $('.section-box').each((index, element) => {
        const title = $(element).find('span').text().trim();
        const titleList = url.split('/')[4]
        if (title.includes(titleList)) {
            const sub = [];

            $(element).find('.clearfix').find('a').each((i, el) => {
                //只保留数字
                const phone = $(el).text().trim().replace(/\D/g, '');
                sub.push(phone);
            });

            results.push({title, sub});
        }
    });
    return results;
}

//获取0到指定数字之间的随机数,增加可选参数位数
function getRandomNumber(max, digits) {
    if (digits !== undefined) {
        const min = Math.pow(10, digits - 1);
        const range = Math.pow(10, digits) - min;
        return Math.floor(Math.random() * range) + min;
    } else {
        return Math.floor(Math.random() * max);
    }
}
