const regex = /%s/gi;

export function processClasses(classes, userClasses) {
    if (!userClasses) {
        return classes.join(" ");
    }
    if (Array.isArray(userClasses)) {
        userClasses = userClasses.join(" ");
    }
    if (!regex.test(userClasses)) {
        return userClasses+" "+classes.join(" ");
    }
    return userClasses.replace(regex, classes.join(" "));
}
