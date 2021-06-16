import * as fromTask from './task.actions';

describe('addTasks', () => {
  it('should return an action', () => {
    expect(fromTask.addTasks().type).toBe('[Task] Add Tasks');
  });
});
