[rewrite_local]
 
https://app.patentexam.com.cn/prod-api/business/attendance_location/selectEnabledLocations url response-body "longitude":116.307007,"latitude":39.826676,"radius":" response-body "longitude":116.306981,"latitude":39.826623,"radius":"300000000000

^https:\/\/app\.patentexam\.com\.cn\/prod-api\/business\/attendance_record\/punch url script-request-body https://raw.githubusercontent.com/ilzge/usecarmod/refs/heads/main/xinusecarqx/xinusecarbetter.js

[mitm] 
hostname = %APPEND% *.patentexam.com.cn
