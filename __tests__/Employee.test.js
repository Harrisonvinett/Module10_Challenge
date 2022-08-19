const Employee = require("../lib/Employee");

test("Can instantiate Employee instance", () => {
  const act = new Employee();
  expect(typeof(act)).toBe("object");
});

test("Can set name via constructor arguments", () => {
  const name = "Alice";
  const act = new Employee(name);
  expect(act.name).toBe(name);
});

test("Can set id via constructor argument", () => {
  const testValue = 100;
  const act = new Employee("Foo", testValue);
  expect(act.id).toBe(testValue);
});

test("Can set email via constructor argument", () => {
  const testValue = "test@test.com";
  const act = new Employee("Foo", 1, testValue);
  expect(act.email).toBe(testValue);
});

test("Can get name via getName()", () => {
  const testValue = "Alice";
  const act = new Employee(testValue);
  expect(act.getName()).toBe(testValue);
});

test("getId() to get it", () => {
  const testValue = 100;
  const act = new Employee(
    "name", testValue);
  expect(act.getId()).toBe(testValue);
});

test("getEmail() to get email", () => {
  const testValue = "test@test.com";
  const act = new Employee(
    "name", 1, testValue);
  expect(act.getEmail()).toBe(testValue);
});

test("getRole() to return \"Employee\"", () => {
  const testValue = "Employee";
  const act = new Employee(
    "name", 1, "test@test.com");
  expect(act.getRole()).toBe(testValue);
});
