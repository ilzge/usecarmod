function generateNonZeroRandom(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        // 生成 1-9 的随机数，规避 0
        result += Math.floor(Math.random() * 9 + 1).toString();
    }
    return result;
}

// HTTPCatcher 中通过 $request.body 获取请求体内容
let body = $request.body;

if (body) {
    // 1. 定义匹配经纬度的正则（兼容有无引号、空格等情况）
    const lonReg = /("longitude"\s*:\s*"?)\d+\.?\d*("?)/g;
    const latReg = /("latitude"\s*:\s*"?)\d+\.?\d*("?)/g;

    // 2. 生成 11 位高精度随机后缀
    const lonSuffix = generateNonZeroRandom(11);
    const latSuffix = generateNonZeroRandom(11);
  
    // 使用函数式替换以确保字符串拼接安全
    body = body.replace(lonReg, (match, p1, p2) => {
        return p1 + "116.308" + lonSuffix + p2;
    });

    body = body.replace(latReg, (match, p1, p2) => {
        return p1 + "39.826" + latSuffix + p2;
    });

    // 4. 将修改后的 body 写回请求
    $request.body = body;
}

// 告知工具脚本执行完毕
$done($request);
