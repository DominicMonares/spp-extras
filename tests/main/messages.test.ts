import { send } from '../../src/utils';

describe('send', () => {
  it('should call the reply function if passed', () => {
    const replyMock = jest.fn();
    send('Test message', replyMock);
    expect(replyMock).toHaveBeenCalled();
    replyMock.mockClear();
  });

  it('should log the message if function is not passed', () => {
    console.log = jest.fn();
    send('Test message');
    expect(console.log).toHaveBeenCalled();
  });
});
