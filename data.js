import fs from "fs";
// console.log(getData());

const data = fs.readFileSync("./valid_guesses.csv", "utf-8").split(/\r?\n/);
let file = fs.createWriteStream("valid.js");
file.write("const valid_words:Set<string>=new Set([");
data.forEach(function (val) {
  file.write("'" + val + "',\n");
});
file.write("]);");
file.write("\n export {valid_words};");
file.end();
console.log(data);
