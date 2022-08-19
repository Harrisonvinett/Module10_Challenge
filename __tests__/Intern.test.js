const Intern = require("../lib/Intern");

test("sets school via constructor", () => {
  const testValue = "Vanderbilt"; 
  const act = new Intern(
    "name", 1, "test@test.com", testValue);
  expect(act.school).toBe(testValue);
});

test("getRole() should return \"Intern\"", () => {
  const testValue = "Intern";
  const act = new Intern(
    "name", 1, "test@test.com", "Vanderbilt");
  expect(act.getRole()).toBe(testValue);
});

test("getSchool() to get school", () => {
  const testValue = "Vanderbilt";
  const act = new Intern(
    "name", 1, "test@test.com", testValue);
  expect(act.getSchool()).toBe(testValue);
});
