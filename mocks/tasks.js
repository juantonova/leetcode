const { Categories } = require("./categories");
const Tags = require("./consts/tags");

const tasksList = [
    {
        id: 1,
        description: "Given a string indicating a range of letters, return a string which includes all the letters in that range, including the last letter. Note that if the range is given in capital letters, return the string in capitals also!",
        incoming_example: "a-z",
        outgoing_example: "abcdefghijklmnopqrstuvwxyz",
        tags: [ Tags.STRINGS ],
        category: Categories.ALGHORITHMS,
        additional_info: [ 'A hyphen will separate the two letters in the string.', 'You don\'t need to worry about error handling in this kata (i.e. both letters will be the same case and the second letter will not be before the first alphabetically).'],
        score: 7,
        title: 'From A to Z'
    },
    {
        id: 2,
        description: "There is an array with some numbers. All numbers are equal except for one. Try to find it!",
        incoming_example: [ 1, 1, 1, 2, 1, 1 ],
        outgoing_example: 2,
        tags: [ Tags.FUNDAMENTALS, Tags.ARRAYS ],
        category: Categories.ARRAYS,
        additional_info: [ 'A hyphen will separate the two letters in the string.', 'You don\'t need to worry about error handling in this kata (i.e. both letters will be the same case and the second letter will not be before the first alphabetically).'],
        score: 7,
        title: 'From A to Z'
    },
]

module.exports = tasksList;