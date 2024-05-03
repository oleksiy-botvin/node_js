// const lodash = require('lodash');
//
// //chunks array
// console.log(lodash.chunk(['d', 'f', '1', 5, 8], 2));
//
// //drop array
// console.log(lodash.chunk(['d', 'f', '1', 5, 8], 1));
//
// //current time of milliseconds
// console.log(lodash.now());
//
// //find minimum value
// console.log(lodash.min([10, 25, 1, 3, 6]));
//
// //rounded number
// console.log(lodash.round(5.654188));

const yargs = require('yargs');
const user = require('./user');

yargs
    .command(
        "list",
        "List of languages",
        (argv) => console.log(user.list())
    )
    .command(
        "add",
        "Add a languages",
        {
            title: {
                type: "string",
                demandOption: true,
                describe: ""
            },
            level: {
                type: "string",
                demandOption: true,
                describe: ""
            }
        },
        (args) => console.log(user.add(args.title, args.level))
    )
    .command(
        "remove",
        "Remove a languages",
        {
            title: {
                type: "string",
                demandOption: true,
                describe: ""
            }
        },
        (args) => console.log(user.remove(args.title))
    )
    .command(
        "read",
        "Find a languages",
        {
            title: {
                type: "string",
                demandOption: true,
                describe: ""
            }
        },
        (args) => console.log(user.read(args.title))
    )
    .parse()