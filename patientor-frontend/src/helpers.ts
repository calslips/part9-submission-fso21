export const assertNever = (value: never, statement: string): never => {
  throw new Error(`Unexpected ${statement}: ${JSON.stringify(value)}`);
};