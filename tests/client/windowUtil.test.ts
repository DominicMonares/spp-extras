import { windowIsSmall } from "../../client/utils";


describe('windowIsSmall', () => {
  it('should determine whether window is small or not', () => {
    expect(windowIsSmall(889)).toBe(true);
    expect(windowIsSmall(991)).toBe(false);
  });
});
