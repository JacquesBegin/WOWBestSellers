const sumClient = require("./testingClient");

test("adds 1 + 2 to equal 3", () => {
  expect(sumClient(1, 2)).toBe(3);
});