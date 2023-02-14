import {
  getFaction
} from '../client/utils';

describe('getFaction', () => {
  it('Should return alliance for human race id', () => {
    expect(getFaction(1)).toBe('alliance');
  });
});
