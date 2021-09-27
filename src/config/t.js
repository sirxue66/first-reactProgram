(function() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var logServerUrl = "client.10010.com/logservice/log/FrontEndLog";
    let msJs = "https://img.client.10010.com/mslab/libs/msJSBridge-0.6.js";

    /**
     *动态加载js
     *
     * @param {*} url
     * @param {*} callback
     */
    function loadJS(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (typeof callback != "undefined") {
            if (script.readyState) {
                script.onreadystatechange = function() {
                    if (
                        script.readyState == "loaded" ||
                        script.readyState == "complete"
                    ) {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {
                script.onload = function() {
                    callback();
                };
            }
        }
        script.src = url;
        document.head.appendChild(script);
    }
    if (typeof ms == "undefined") {
        loadJS(msJs, () => {
            console.log("初次 msJs done");
        });
    }
    function getCookie(name) {
        var cookieName = encodeURIComponent(name) + "=";
        var cookieStart = document.cookie.indexOf(cookieName);
        var cookieValue = null;
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(
                document.cookie.substring(
                    cookieStart + cookieName.length,
                    cookieEnd
                )
            );
        }
        return cookieValue;
    }
    function getParam(name) {
        var url = decodeURIComponent(window.location.href);
        try {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = url.split("?")[1];
            var r1 = r.split("?")[0].match(reg);
            if (r1 != null) return r1[2];
            return "";
        } catch (e) {
            return "";
        }
        // (decodeURIComponent((new RegExp('[?|&]duanlianjieabc=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\%20/g, '+')) || '')
    }
    function encodeUrl(obj) {
        let url = "";
        (function(obj) {
            let kvArr = Object.entries(obj);
            kvArr.forEach(v => {
                if (Object.prototype.toString.call(v[1]) == "[object Object]") {
                    arguments.callee(v[1]);
                } else {
                    url += v.join("=") + "&";
                }
            });
        })(obj);
        return url.substring(0, url.length - 1);
    }
    function frontEndLog(obj = {}, endCallback = Function) {
        if (typeof ms == "undefined") {
            loadJS(msJs, () => {
                console.log("msJs done");
                var version = ms.appVersion();
                console.log("客户端版本号 frontEndLog", version);
                //通过判断客户端版本号做不同的逻辑处理
                if (version > 8.0603) {
                    initFrontEndLog(obj, endCallback);
                } else {
                    console.log("客户端版本低于8.0604，请升级后查看");
                    // if (!ms.isInApp()) initFrontEndLog(obj, endCallback);
                }
            });
        } else {
            var version = ms.appVersion();
            console.log("客户端版本号 frontEndLog", version);
            //通过判断客户端版本号做不同的逻辑处理
            if (version > 8.0603) {
                initFrontEndLog(obj, endCallback);
            } else {
                console.log("客户端版本低于8.0604，请升级后查看");
                // if (!ms.isInApp()) initFrontEndLog(obj, endCallback);
            }
        }
    }

    function LogTime(params = { date: "", type: "" }) {
        var { date, type } = params;
        var time = !!params.date ? new Date(params.date) : new Date();
        // console.log("fn", type)
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = time.getDate();
        d = d < 10 ? "0" + d : d;
        var hh = time.getHours();
        hh = hh < 10 ? "0" + hh : hh;
        var mm = time.getMinutes();
        mm = mm < 10 ? "0" + mm : mm;
        var ss = time.getSeconds();
        ss = ss < 10 ? "0" + ss : ss;
        var SSS = time.getMilliseconds();
        SSS = SSS < 10 ? "0" + SSS : SSS;
        if (type == "-") {
            return [y, m, d].join("-"); // 点击时间
        } else if (type == "utf8") {
            return (
                y + "年" + m + "月" + d + "日" + " " + hh + ":" + mm + ":" + ss
            ); // 点击时间
        } else if (typeof type === "number" && type == 1) {
            return [y, m, d, hh, mm, ss, SSS].join(""); // 点击时间
        }
        return [y, m, d, hh, mm, ss].join(""); // 点击时间
    }
    function randomString(e) {
        e = e || 32;
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789",
            a = t.length,
            n = "";
        for (var i = 0; i < e; i++)
            n += t.charAt(Math.floor(Math.random() * a));
        return n;
    }
    function initFrontEndLog(obj = {}, endCallback = Function) {
        return new Promise((resolve, reject) => {
            try {
                // 字段名称	字段编码	父节点	是否必填	参数类型	描述
                // 用户行为id（点击业务入口）	behaviorId		y	string	6位随机数+时间戳毫秒数
                // 123456+1629942684638
                // 会话id（客户端提供）	sessionId		y	string
                // 手机号码	userMobile			string
                // 访问时间（前端系统时间）	accessTime		y	string	（当前日期时分秒）20210826093252
                // 设备id（imei，uuid）	deviceCode			string
                // 页面响应时长	responseTime		y	string	非必传
                // 来源渠道（标注从哪进入）	frontSources			string	channel
                // 目标渠道（标注跳转到哪）	sourcesTarget			string
                // 业务触点编码	contactCode			string
                // 点击坑位（按钮，图片链接，tab页签）	pitId			string
                // 版本号（客户端版本号）	versionId			string	appVersion:iphone_c@8.0102、android@8.0102
                // 短连接编码	shortAddress			string	duanlianjieabc
                // 业务编码	serviceCode			string	csdBusinessCode
                // 获取getclientinfo
                var paramsObj = new Object();
                // 创建image对象
                var imgLog = new Image(1, 1);
                var getClientInfo = !!sessionStorage.getItem("getClientInfo")
                    ? JSON.parse(sessionStorage.getItem("getClientInfo"))
                    : !!window.getClientInfo
                    ? window.getClientInfo
                    : new Object();

                // 需要落的字段
                var umobile = obj["userMobile"]
                    ? obj["userMobile"]
                    : getClientInfo.currentPhoneNumber
                    ? getClientInfo.currentPhoneNumber
                    : "";
                paramsObj["userMobile"] =
                    obj["userMobile"] || getCookie(`u_account`) || umobile;
                paramsObj["serviceCode"] = obj["serviceCode"] || "";

                var params = {};
                var pvSessionId = ms.execSync("PvSessionId", params);
                paramsObj["sessionId"] = pvSessionId; // 客户端sessionId

                var sessBehaviorId = sessionStorage.getItem("behaviorId");
                var behaviorId = sessBehaviorId
                    ? sessBehaviorId
                    : randomString(16) + LogTime({ date: "", type: 1 });
                paramsObj["behaviorId"] = behaviorId;
                sessionStorage.setItem("behaviorId", behaviorId);

                paramsObj["responseTime"] = obj["responseTime"]
                    ? obj["responseTime"]
                    : "";
                paramsObj["accessTime"] = obj["accessTime"] || LogTime();
                var deviceid = isiOS
                    ? getClientInfo.imei
                        ? getClientInfo.imei
                        : ""
                    : getClientInfo.uuid
                    ? getClientInfo.uuid
                    : ""; //imei
                paramsObj["deviceCode"] = obj["deviceCode"] || deviceid;
                var cversion = getClientInfo.clientVersion
                    ? getClientInfo.clientVersion
                    : "";
                paramsObj["versionId"] =
                    obj["versionId"] || getCookie(`c_version`) || cversion; // 客户端类型
                paramsObj["frontSources"] =
                    obj["frontSources"] || getParam("channel");
                paramsObj["contactCode"] =
                    obj["contactCode"] || getParam("contactCode");
                paramsObj["shortAddress"] =
                    obj["shortAddress"] || getParam("duanlianjieabc");
                paramsObj["sourcesTarget"] = obj["sourcesTarget"] || "";
                paramsObj["pitId"] = obj["pitId"] || "";
                paramsObj = {
                    ...paramsObj,
                    ...obj
                };
                // 通过image对象src属性发送get请求
                imgLog.src = `${
                    window.location.protocol
                }//${logServerUrl}?${encodeUrl(paramsObj)}`;
                var imgData = {
                    src: imgLog.src,
                    succBoolean: true
                };
                console.log("onloadImgLog src", imgLog.src);
                imgLog.onload = function() {
                    imgData.on = "onload";
                    resolve(imgData);
                };
                imgLog.onerror = function() {
                    // 因为是地址链接，不是图片链接，图片加载失败会触发image对象的onerror事件
                    imgData.on = "onerror";
                    resolve(imgData);
                };
            } catch (error) {
                reject(error);
            }
        });
    }
    window.frontEndLog = frontEndLog;

    //监听用户无操作方法  时间单位是秒  后面是回调函数
    function userNoActionListen(time,callback) {
        var userTime = time;
        var objTime = {
            init: 0,
            time: function () {
                objTime.init += 1;
                if (objTime.init == userTime) {
                    callback(true); // 用户到达未操作事件 做一些处理
                }
            },
            eventFun: function () {
                clearInterval(testUser);
                objTime.init = 0;
                testUser = setInterval(objTime.time, 1000);
            }
        }
        var testUser = setInterval(objTime.time, 1000);
        var body = document.querySelector('html');
        body.addEventListener("click", objTime.eventFun);
        body.addEventListener("keydown", objTime.eventFun);
        body.addEventListener("touchmove", objTime.eventFun);
        body.addEventListener("mousewheel", objTime.eventFun);
    }
    window.userNoActionListen = userNoActionListen;
})();