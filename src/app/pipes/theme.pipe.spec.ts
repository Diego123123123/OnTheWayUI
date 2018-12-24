import { ThemePipe } from './theme.pipe';

describe('ThemePipe', () => {
  it('create an instance', () => {
    const pipe = new ThemePipe(null);
    expect(pipe).toBeTruthy();
  });
});
