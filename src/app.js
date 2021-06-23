// 新建 reactMiniBook.js, 运行 node reactMiniBook.js 生成pdf
const puppeteer = require('puppeteer');

const timeout = (s) => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, s || 0);
});

(async () => {
    // 启动浏览器
    const browser = await puppeteer.launch({
        // 无界面 默认为true,改成false,则可以看到浏览器操作，目前生成pdf只支持无界面的操作。
        // headless: false,
        // 开启开发者调试模式，默认false, 也就是平时F12打开的面版
        // devtools: true,
    });
    // 打开一个标签页
    const page = await browser.newPage();

    // 以iPhone 11执行
    await page.emulate(puppeteer.devices['iPhone 11']);

    await page.goto(
        'http://es6.ruanyifeng.com/#README',
        { waitUntil: 'networkidle2' }
    );

    await timeout(2000);

    // page.evaluate 回调在可执行浏览器环境中代码逻辑，如 dom 操作等
    let aTags = await page.evaluate(() => {
        // 这里的 console 打印看不到，因为回调是在浏览器环境中打印的，非 node 环境
        let as = [...document.querySelectorAll('ol li a')];
        return as.map((a) => {
            return {
                href: a.href.trim(),
                name: a.text
            }
        });
    });

    // let wh = await page.evaluate((args) => {
    //     // args 可以这样传递给这个函数。
    //     // 类似于 setTimeout(() => {console.log(args);}, 3000, args);
    //     console.log('args=====', args, document); // 1
    //     // 这里可以运行 dom操作等js
    //     // 返回通过dom操作等获取到的数据
    //     return {
    //         width: 1920,
    //         height: document.body.clientHeight,
    //     };
    // });
    // // 设置视图大小
    // await page.setViewport(wh);

    // path 路径， format 生成pdf页面格式
    await page.pdf({ path: 'rxjs.pdf', format: 'A4' });
    // 关闭浏览器
    await browser.close();
})();