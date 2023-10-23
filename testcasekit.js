//Testcases by willmil11
//

module.exports = {
    "system": {
        "coloredtext": function (color, backgroundcolor, text) {
            var background, textColor;
            if (color === "green") {
                textColor = "\x1b[38;2;105;255;150m";
            }
            else {
                if (color === "white") {
                    textColor = "\x1b[38;2;255;255;255m";
                }
                else {
                    if (color === "black") {
                        textColor = "\x1b[38;2;0;0;0m";
                    }
                    else {
                        if (color === "gray") {
                            textColor = "\x1b[38;2;100;105;110m";
                        }
                        else {
                            if (color === "red") {
                                //255, 80, 80
                                textColor = "\x1b[38;2;255;80;80m";
                            }
                            else {
                                throw "Invalid color";
                            }
                        }
                    }
                }
            }
            if (backgroundcolor === "green") {
                background = "\x1b[48;2;105;255;150m";
            }
            else {
                if (backgroundcolor === "white") {
                    background = "\x1b[48;2;255;255;255m";
                }
                else {
                    if (backgroundcolor === "black") {
                        background = "\x1b[38;2;0;0;0m";
                    }
                    else {
                        if (backgroundcolor === "gray") {
                            background = "\x1b[38;2;100;105;110m";
                        }
                        else {
                            if (backgroundcolor === "red") {
                                //255, 80, 80
                                background = "\x1b[48;2;255;80;80m";
                            }
                            else {
                                throw "Invalid background color";
                            }
                        }
                    }
                }
            }
            return `${background}${textColor}${text}\x1b[0m`;
        }
    },
    "test": function (name, callback) {
        if (name == null) {
            throw "[Testcases] Name is null";
            return;
        }
        else {
            if (!(typeof name === "string")) {
                throw "[Testcases] Name is not a string";
                return;
            }
        }
        if (callback == null) {
            throw "[Testcases] Callback is null";
            return;
        }
        else {
            if (!(typeof callback === "function")) {
                throw "[Testcases] Callback is not a function";
                return;
            }
        }
        var passed = true;
        var passedItems = [];
        var failedItems = [];
        callback({
            "system": {
                "finished": false
            },
            "expect": (name, value) => {
                if (this.system.finished) {
                    throw "[Testcases] The test you're trying to access is set as finished";
                    return;
                }
                if (name == null) {
                    throw "[Testcases] Name is null";
                    return;
                }
                else {
                    if (!(typeof name === "string")) {
                        throw "[Testcases] Name is not a string";
                        return;
                    }
                }
                if (value == null) {
                    throw "[Testcases] Value is null";
                    return;
                }
                return {
                    "toBe": function (value2) {
                        if (value2 == null) {
                            throw "[Testcases] Second value is null";
                            return;
                        }
                        if (!(value == value2)) {
                            passed = false;
                            failedItems.push(name);
                        }
                        else {
                            passedItems.push(name);
                        }
                    },
                    "toStrictlyBe": function (value2) {
                        if (value2 == null) {
                            throw "[Testcases] Second value is null";
                            return;
                        }
                        if (!(value === value2)) {
                            passed = false;
                            failedItems.push(name);
                        }
                        else {
                            passedItems.push(name);
                        }
                    },
                    "toBeLessThan": function (value2) {
                        if (value2 == null) {
                            throw "[Testcases] Second value is null";
                            return;
                        }
                        if (!(value < value2)) {
                            passed = false;
                            failedItems.push(name);
                        }
                        else {
                            passedItems.push(name);
                        }
                    },
                    "toBeMoreThan": function (value2) {
                        if (value2 == null) {
                            throw "[Testcases] Second value is null";
                            return;
                        }
                        if (!(value > value2)) {
                            passed = false;
                            failedItems.push(name);
                        }
                        else {
                            passedItems.push(name);
                        }
                    },
                    "not": {
                        "toBe": function (value2) {
                            if (value2 == null) {
                                throw "[Testcases] Second value is null";
                                return;
                            }
                            if (value == value2) {
                                passed = false;
                                failedItems.push(name);
                            }
                            else {
                                passedItems.push(name);
                            }
                        },
                        "toStrictlyBe": function (value2) {
                            if (value2 == null) {
                                throw "[Testcases] Second value is null";
                                return;
                            }
                            if (value === value2) {
                                passed = false;
                                failedItems.push(name);
                            }
                            else {
                                passedItems.push(name);
                            }
                        },
                        "toBeLessThan": function (value2) {
                            if (value2 == null) {
                                throw "[Testcases] Second value is null";
                                return;
                            }
                            if (value < value2) {
                                passed = false;
                                failedItems.push(name);
                            }
                            else {
                                passedItems.push(name);
                            }
                        },
                        "toBeMoreThan": function (value2) {
                            if (value2 == null) {
                                throw "[Testcases] Second value is null";
                                return;
                            }
                            if (value > value2) {
                                passed = false;
                                failedItems.push(name);
                            }
                            else {
                                passedItems.push(name);
                            }
                        }
                    }
                }
            },
            "finish": () => {
                this.system.finished = true;
                if (passed) {
                    console.log(module.exports.system.coloredtext("black", "green", " PASS ") + " " + name);
                }
                else {
                    console.log(module.exports.system.coloredtext("black", "red", " FAIL ") + " " + name);
                }
                var index = 0;
                while (index < failedItems.length) {
                    console.log("    " + module.exports.system.coloredtext("red", "black", "\u2717") + " " + module.exports.system.coloredtext("gray", "black", failedItems[index]));
                    index += 1;
                }
                var index = 0;
                while (index < passedItems.length) {
                    console.log("    " + module.exports.system.coloredtext("green", "black", "\u2713") + " " + module.exports.system.coloredtext("gray", "black", passedItems[index]));
                    index += 1;
                }
                console.log("");
                if (failedItems.length > 0) {
                    if (passedItems.length > 0) {
                        console.log("Tests: " + module.exports.system.coloredtext("green", "black", passedItems.length + " passed") + ", " + module.exports.system.coloredtext("red", "black", failedItems.length + " failed") + ", " + (passedItems.length + failedItems.length) + " total");
                    }
                    else{
                        console.log("Tests: " + module.exports.system.coloredtext("red", "black", failedItems.length + " failed") + ", " + (passedItems.length + failedItems.length) + " total");
                    }
                }
                else {
                    if (passedItems.length > 0){
                        console.log("Tests: " + module.exports.system.coloredtext("green", "black", passedItems.length + " passed") + ", " + (passedItems.length + failedItems.length) + " total");
                    }
                    else{
                        console.log("Tests: " + (passedItems.length + failedItems.length) + " total");
                    }
                }
            }
        })
    }
}