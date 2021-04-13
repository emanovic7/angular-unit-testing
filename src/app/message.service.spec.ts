import { MessageService } from "./message.service";

describe('MessageService', () => {

    let service: MessageService;

    beforeEach(() => {
      service = new MessageService();
    });

    it('should have no messages to start with', () => {
      expect(service.messages.length).toBe(0);
    });

    it('should add a message when #add is called', () => {
      //arrange
      let message1 = service.add('message one');
      //assert
      expect(service.messages.length).toBe(1);
    });

    it('should remove all messages when #clear is called', () => {
      //arrange
      let message2 = service.add('message two');
      service.clear();

      //assert
      expect(service.messages.length).toBe(0);
    });
});