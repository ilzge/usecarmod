var body = $response.body.replace(/"longitude":116\.30\d*,"latitude":39\.82\d*,"radius":"[^"]*"/g, '"longitude":116.307007,"latitude":39.826676,"radius":"33000000000000"');

$done({ body });
