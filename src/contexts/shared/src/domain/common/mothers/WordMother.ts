import { Mother } from '../../core/Mother';

export class WordMother {
  generate({ minLength = 1, maxLength }: { minLength?: number; maxLength: number }): string {
    return (
      Mother.random().lorem.word(Math.floor(Math.random() * (maxLength - minLength)) + minLength) || 'word'
    );
  }

  country(): string {
    return Mother.random().location.country();
  }

  image(): string {
    return Mother.random().image.url();
  }

  timezone(): string {
    return Mother.random().location.timeZone();
  }
}
