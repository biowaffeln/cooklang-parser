import * as fs from "fs";
import * as yaml from "yaml";
import { parse } from "../src";

const testYAML = fs.readFileSync("./tests/test.yaml", "utf8");
const testData = yaml.parse(testYAML).tests as Record<
	string,
	{ source: any; result: any }
>;

describe("canonical tests", () => {
	for (const [name, testEntry] of Object.entries(testData)) {
		it(name, () => {
			const { source, result } = testEntry;

			const expected = {
				steps: result.steps,
				metadata: Array.isArray(result.metadata) ? {} : result.metadata,
			};
			const actual = parse(source);

			expect(actual).toEqual(expected);
		});
	}
});
