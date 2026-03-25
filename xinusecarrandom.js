

// 1. 将函数移至顶层，增加健壮性
function generateNonZeroRandom(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        // 产生 1-9 之间的随机整数
        result += Math.floor(Math.random() * 9 + 1).toString();
    }
    return result;
}

let body = $request.body;

if (body) {
    // 2. 增强型正则表达式
    // 能够匹配 "longitude": 116.307 或 "longitude":"116.307"
    // 括号 () 用于捕获组，$1 代表前缀，$2 代表后缀引号
    const lonReg = /("longitude"\s*:\s*"?)\d+\.?\d*("?)/g;
    const latReg = /("latitude"\s*:\s*"?)\d+\.?\d*("?)/g;

    // 3. 生成 12 位随机数，加上 .30 正好是 14 位小数
    const lonSuffix = generateNonZeroRandom(12);
    const latSuffix = generateNonZeroRandom(12);

    // 4. 执行替换
    body = body.replace(lonReg, `$1116.30${lonSuffix}$2`);
    body = body.replace(latReg, `$139.82${latSuffix}$2`);
    
    // 打印日志方便在小火箭的“脚本”日志里调试（正式使用时可删除）
    // console.log("修改后的请求体: " + body);
}

// 5. 必须调用 $done
$done({ body });