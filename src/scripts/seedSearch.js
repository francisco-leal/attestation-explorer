const algoliasearch = require("algoliasearch");
const path = require("path");

require("dotenv").config({
  path: path.resolve(
    process.cwd(),
    `.env.${process.env.NODE_ENV || "development"}`
  ),
});

console.log("Seeding search database");

const ALGOLIA_SEARCH_APP_ID = process.env.ALGOLIA_SEARCH_APP_ID || "";
const ALGOLIA_SEARCH_APP_KEY = process.env.ALGOLIA_SEARCH_APP_KEY || "";

const TALENT_PROTOCOL_CREDENTIALS = "TALENT_PROTOCOL_CREDENTIALS";

console.log(`APP_ID = ${ALGOLIA_SEARCH_APP_ID}`);

const index = client.initIndex(TALENT_PROTOCOL_CREDENTIALS); // This is going to be an index of the attestations for the schema TALENT_PROTOCOL_CREDENTIALS

console.log("Saving objects ************************************");

const records = [{}];

const recordsToSave = [records[0]];

index
  .saveObjects(recordsToSave, { autoGenerateObjectIDIfNotExist: true })
  .wait()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
