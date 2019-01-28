import { ManagerRoutingModule } from './manager-routing.module';

describe('ManagerRoutingModule', () => {
  let managerRoutingModule: ManagerRoutingModule;

  beforeEach(() => {
    managerRoutingModule = new ManagerRoutingModule();
  });

  it('should create an instance', () => {
    expect(managerRoutingModule).toBeTruthy();
  });
});
