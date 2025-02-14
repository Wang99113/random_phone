const express = require('express');
const path = require('path');

const provincesRouter = require("./routes/provinces");
const generateRouter = require("./routes/generate");

const app = express();
const port = 3000;
// 首页
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// 提供静态文件服务
app.use(express.static(path.join(__dirname, 'public')));
//路由
app.use("/provinces", provincesRouter);
app.use("/generate", generateRouter);


// 启动服务
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    require('child_process').exec(`start http://localhost:${port}`); // 自动打开浏览器（Windows）
});


// fetchData(url);
