export class RandomNumber {
  private generatedNumbers: Set<unknown>;

  constructor() {
    this.generatedNumbers = new Set();
  }

  getRandomNumber(): number {
    let randomNumber = Math.floor(Math.random() * 90000) + 10000;

    while (this.generatedNumbers.has(randomNumber)) {
      randomNumber = Math.floor(Math.random() * 90000) + 10000;
    }

    this.generatedNumbers.add(randomNumber);
    return randomNumber;
  }
}
