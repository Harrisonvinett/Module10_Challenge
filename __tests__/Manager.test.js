const Manager = require("../lib/Manager");
const Employee = require("../lib/Employee");

test("Can set office number via constructor argument", () => {
  const testValue = 100;
  const act = new Manager(
    "name", 1, "test@test.com", testValue);
  expect(act.officeNumber).toBe(testValue);
});

test("getRole() should return \"Manager\"", () => {
  const testValue = "Manager";
  const act = new Manager(
    "name", 1, "test@test.com", 100);
  expect(act.getRole()).toBe(testValue);
});

test("getOffice() tp get office number", () => {
  const testValue = 100;
  const act = new Manager(
    "name", 1, "test@test.com", testValue);
  expect(act.getOfficeNumber()).toBe(testValue);
});
