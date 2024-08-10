import fs from "fs";
import path from "path";

const readFixture = (fixtureFileName: string): string => {
  return fs.readFileSync(
    path.join(__dirname, `../fixtures/${fixtureFileName}`),
    "utf8"
  );
};

const readJsonFixture = (fixtureFileName: string): string => {
  return JSON.parse(readFixture(fixtureFileName));
};

export { readFixture };
export default readJsonFixture;
