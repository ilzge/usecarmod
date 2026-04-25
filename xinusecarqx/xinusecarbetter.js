let body = $request.body;

function rebuild(value, prefix) {
    value = String(value);

    let tail = "";
    if (value.includes(".")) {
        let d = value.split(".")[1];
        tail = d.length > 3 ? d.slice(3) : "";
    }

    return prefix + tail;
}

// longitude
body = body.replace(
    /("longitude"\s*:\s*)(\"?)([\d.]+)(\"?)/,
    (_, p1, q1, val, q2) => p1 + q1 + rebuild(val, "116.308") + q2
);

// latitude
body = body.replace(
    /("latitude"\s*:\s*)(\"?)([\d.]+)(\"?)/,
    (_, p1, q1, val, q2) => p1 + q1 + rebuild(val, "39.826") + q2
);

$done({ body });
