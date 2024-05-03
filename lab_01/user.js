const fs = require('fs');
const lodash = require('lodash');

function list() {
    const user = getUser();
    return user.languages ? user.languages : "list of languages is empty"
}

function add(title, level) {
    try {
        const user = getUser();
        if (!user.languages) user.languages = [];

        if (lodash.find(user.languages, (it) => it.title === title)) {
            return `${title} language is already in the list`
        }

        user.languages.push({ title: title, level: level })
        fs.writeFileSync("user.json", JSON.stringify(user));
        return `${title} language added`
    } catch (e) {
        return e.message
    }
}

function remove(title) {
    try {
        const user = getUser();
        if (!user.languages) return `${title} language removed`
        lodash.remove(user.languages, (it) => it.title === title)
        fs.writeFileSync("user.json", JSON.stringify(user));
        return `${title} language removed`
    } catch (e) {
        return e.message
    }
}

function read(title) {
    try {
        const user = getUser();
        if (!user.languages) return `${title} language removed`
        const languages = lodash.find(user.languages, (it) => it.title === title)
        return languages ? languages : `${title} language is not in the list`
    } catch (e) {
        return e.message
    }
}

function getUser() {
    try {
        const json = fs.readFileSync("user.json", "utf-8")
        return JSON.parse(json);
    } catch (e) {
        return {
            first_name: "Oleksiy",
            last_name: "Botvin",
            languages: []
        }
    }
}


module.exports = { list, add, remove, read }