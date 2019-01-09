var myTools = {};
myTools.customTrim = function (obj) {
    var result;
    if (Object.prototype.toString.call(obj) == "[object Array]") {
        result = obj;
        obj.forEach(item => {
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    let element = item[key];
                    if (Object.prototype.toString.call(element) != "[object String]") {
                        obj[key] = customTrim(element);
                    } else {
                        obj[key] = element.trim();
                    }
                }
            }
        });
        return result;
    }
    if (Object.prototype.toString.call(obj) == "[object Object]") {
        result = obj;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                let element = obj[key];
                if (Object.prototype.toString.call(element) != "[object String]") {
                    obj[key] = customTrim(element);
                } else {
                    obj[key] = element.trim();
                }
            }
        }
        return result;
    }
}

module.exports = myTools;