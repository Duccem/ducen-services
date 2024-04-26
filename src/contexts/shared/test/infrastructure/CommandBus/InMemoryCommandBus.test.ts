import { InternalError } from '../../../src/domain/Errors/InternalError';
import { CommandHandlers } from '../../../src/infrastructure/Command/CommandHandlers';
import { InMemoryCommandBus } from '../../../src/infrastructure/Command/InMemoryCommandBus';
import { CommandHandlerDummy } from './__mocks__/CommandHandlerDummy';
import { DummyCommand } from './__mocks__/DummyCommand';
import { UnhandledCommand } from './__mocks__/UnhandledCommand';

describe('InMemoryCommandBus', () => {
  it('throws an error if dispatches a command without handler', async () => {
    const unhandledCommand = new UnhandledCommand();
    const commandHandlers = new CommandHandlers([]);
    const commandBus = new InMemoryCommandBus(commandHandlers);

    await expect(commandBus.dispatch(unhandledCommand)).rejects.toBeInstanceOf(InternalError);
  });

  it('accepts a command with handler', async () => {
    const dummyCommand = new DummyCommand();
    const commandHandlerDummy = new CommandHandlerDummy();
    const commandHandlers = new CommandHandlers([commandHandlerDummy]);
    const commandBus = new InMemoryCommandBus(commandHandlers);

    await expect(commandBus.dispatch(dummyCommand)).resolves.toBeUndefined();
  });
});
