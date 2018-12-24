import { MdbModule } from './mdb-bootstrap.module';

describe('MdbBootstrapModule', () => {
  let mdbBootstrapModule: MdbModule;

  beforeEach(() => {
    mdbBootstrapModule = new MdbModule();
  });

  it('should create an instance', () => {
    expect(mdbBootstrapModule).toBeTruthy();
  });
});
