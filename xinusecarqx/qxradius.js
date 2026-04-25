let body = $response.body;

try {
    let obj = JSON.parse(body);

    if (Array.isArray(obj.data)) {
        obj.data.forEach(item => {
            if (item.name === "丰台科技园") {
                item.radius = "30000000";
                console.log("已成功修改丰台科技园范围");
            }
        });
    }

    $done({ body: JSON.stringify(obj) });

} catch (e) {
    console.log("JSON解析失败: " + e);
    $done({ body });
}
