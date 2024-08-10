import context from "jest-plugin-context";
import readJsonFixture from "../support/readFixture";
import jsonPassportToEasAttestation from "@/utils/jsonPassportToEasAttestation";

describe("jsonPassportToEasAttestation", function () {
  context("given a valid passport", function () {
    const validPassport = readJsonFixture("panagiotis_matsinopoulos.json");

    const expectedEasAttestationData = readJsonFixture(
      "panagiotis_matsinopoulos_eas_attestation_data.json"
    );

    it("converts it to proper attestation data", function () {
      const easAttestationData = jsonPassportToEasAttestation(validPassport);

      expect(easAttestationData).toStrictEqual(expectedEasAttestationData);
    });
  });
});
