const userName = require('os').userInfo().username;
const fs = require('fs');
fs.appendFile("txt_files/task_3.txt", `Hello, ${userName}!\n`, (err) => {})