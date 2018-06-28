const regex = /%s/gi;
export function formatString(str) {
    return str.replace("_", "-");
}

export function processAttributes(attrs) {
    let result = {};
    for(let key of Object.keys(attrs)) {
        let newKey = formatString(key);
        result[newKey] = attrs[key];
    }
    return result;
}

export function processClasses(classes, userClasses) {
    if (Array.isArray(userClasses)) {
        userClasses = userClasses.join(" ");
    }
    if (!regex.test(userClasses)) {
        return userClasses+" "+classes.join(" ");
    }
    return userClasses.replace(regex, classes.join(" "));
}
