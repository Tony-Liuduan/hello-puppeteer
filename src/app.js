// 新建 reactMiniBook.js, 运行 node reactMiniBook.js 生成pdf
const puppeteer = require('puppeteer');

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

    const args = 1;
    let wh = await page.evaluate((args) => {
        // args 可以这样传递给这个函数。
        // 类似于 setTimeout(() => {console.log(args);}, 3000, args);
        console.log('args', args); // 1
        // 这里可以运行 dom操作等js
        // 返回通过dom操作等获取到的数据
        return {
            width: 1920,
            height: document.body.clientHeight,
        };
    }, args);
    // 设置视图大小
    // await page.setViewport(wh);
    // 等待2s
    // await page.waitFor(2000);


    await page.goto(
        'https://mp.weixin.qq.com/s/xKppz1O-L4rYiNpOaUb0SQ',
        { waitUntil: 'networkidle2' }
    );
    // 以iPhone 11执行
    await page.emulate(puppeteer.devices['iPhone 11']);

    // path 路径， format 生成pdf页面格式
    await page.pdf({ path: 'rxjs.pdf', format: 'A4' });
    // 关闭浏览器
    await browser.close();
})();