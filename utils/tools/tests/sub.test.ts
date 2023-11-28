import { sub } from "../src/sub";

test("测试sub方法", () => {
  const result = sub(3, 1);
  expect(result).toBe(2);
});
