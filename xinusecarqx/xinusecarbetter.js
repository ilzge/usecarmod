let body = $request.body;

if (body) {
    try {
        let obj = JSON.parse(body);

        function rewriteCoord(value, prefix) {
            if (value === undefined || value === null) return value;

            // 1. 记录原始值是否为字符串类型
            const isString = typeof value === 'string';
            
            // 2. 统一转为字符串进行正则匹配处理
            let valStr = value.toString();
            let match = valStr.match(/^\d+\.(\d+)/);
            
            let resultValue;
            if (match) {
                let tail = match[1].slice(3);
                resultValue = prefix + tail;
            } else {
                resultValue = prefix;
            }

            // 3. 【核心逻辑】根据原始类型决定返回结果
            // 如果原始是字符串，直接返回结果（字符串）
            // 如果原始是数字，则转回浮点数
            return isString ? resultValue : parseFloat(resultValue);
        }

        // 自动适配多种常见的坐标字段名
        const fields = [
            { lng: 'longitude', lat: 'latitude' },
            { lng: 'lng', lat: 'lat' },
            { lng: 'lon', lat: 'lat' }
        ];

        fields.forEach(pair => {
            if (obj[pair.lng] !== undefined) obj[pair.lng] = rewriteCoord(obj[pair.lng], "116.308");
            if (obj[pair.lat] !== undefined) obj[pair.lat] = rewriteCoord(obj[pair.lat], "39.826");
        });

        body = JSON.stringify(obj);

    } catch (e) {
        console.log("脚本执行异常: " + e);
    }
}

$done({ body });
