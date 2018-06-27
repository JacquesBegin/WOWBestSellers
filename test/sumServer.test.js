const sumServer = require("../server/testingServer");

test("adds 1 + 2 to equal 3", () => {
  expect(sumServer(1, 2)).toBe(3);
});