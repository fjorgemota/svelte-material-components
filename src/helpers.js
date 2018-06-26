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
