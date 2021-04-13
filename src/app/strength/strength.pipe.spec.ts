import { StrengthPipe } from "./strength.pipe"

describe('StrengthPipe', () => {
  let pipe;

  beforeEach(() => {
    //Arrange
    pipe = new StrengthPipe();
  })

  it('should display weak if strength is 5', () => {
    //Act
    let val = pipe.transform(5);
    //Assert
    expect(val).toEqual('5 (weak)');
  });

  it('should display strong if strenght is 10', () => {
    //Act
    let val = pipe.transform(10);
    //Assert
    expect(val).toEqual('10 (strong)');
  })
})