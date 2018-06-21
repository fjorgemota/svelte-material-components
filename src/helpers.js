const uppercase = /[A-Z]/g;

function formatChar(char) {
    return "-"+char.toLowerCase();
}

export function formatString(str) {
    return str.replace(uppercase, formatChar);
}

export function processAttributes(attrs) {
    let result = {};
    for(let key of Object.keys(attrs)) {
        let newKey = formatString(key);
        result[newKey] = attrs[key];
    }
    return result;
}
