const Engineer = require("../lib/Engineer");
// creates subclass
test("Can set GitHUb account via constructor", () => {
  const testValue = "GitHubUser";
  const act = new Engineer(
    "name", 1, "test@test.com", testValue);
  expect(act.github).toBe(testValue);
});

test("getRole() should return \"Engineer\"", () => {
  const testValue = "Engineer";
  const act = new Engineer(
    "name", 1, "test@test.com", "GitHubUser");
  expect(act.getRole()).toBe(testValue);
});

test("getGithub() to get GitHub username", () => {
  const testValue = "GitHubUser";
  const act = new Engineer(
    "name", 1, "test@test.com", testValue);
  expect(act.getGithub()).toBe(testValue);
});
