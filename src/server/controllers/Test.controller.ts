import Private from '../decorators/Private.decorator';

class TestController {
  @Private
  echo() {
    return 'Hello World!';
  }
}

export default new TestController();
