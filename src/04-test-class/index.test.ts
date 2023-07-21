import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const balance = 100;

  test('should create account with initial balance', () => {
    const bankAcc = getBankAccount(balance);
    expect(bankAcc.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAcc = getBankAccount(balance);
    const amountToWithDraw = 200;

    expect(() => {
      bankAcc.withdraw(amountToWithDraw);
    }).toThrow(new InsufficientFundsError(balance));
  });

  test('should throw error when transferring more than balance', () => {
    const bankAcc = getBankAccount(balance);

    const anotherBalance = 50;
    const anotherAccount = getBankAccount(anotherBalance);

    const amountToTransfer = 200;

    expect(() => {
      bankAcc.transfer(amountToTransfer, anotherAccount);
    }).toThrow(new InsufficientFundsError(balance));
  });

  test('should throw error when transferring to the same account', () => {
    const bankAcc = getBankAccount(balance);

    const amountToTransfer = 200;

    expect(() => {
      bankAcc.transfer(amountToTransfer, bankAcc);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const bankAcc = getBankAccount(balance);
    const amountToDeposit = 200;

    expect(bankAcc.deposit(amountToDeposit).getBalance()).toEqual(
      balance + amountToDeposit,
    );
  });

  test('should withdraw money', () => {
    const bankAcc = getBankAccount(balance);
    const amountToWithDraw = 60;

    expect(bankAcc.withdraw(amountToWithDraw).getBalance()).toEqual(
      balance - amountToWithDraw,
    );
  });

  test('should transfer money', () => {
    const bankAcc = getBankAccount(balance);

    const anotherBalance = 50;
    const anotherAcc = getBankAccount(anotherBalance);

    const amountToTransfer = 50;

    expect(bankAcc.transfer(amountToTransfer, anotherAcc).getBalance()).toEqual(
      balance - amountToTransfer,
    );
    expect(anotherAcc.getBalance()).toEqual(anotherBalance + amountToTransfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAcc = getBankAccount(balance);

    const currBalance = await bankAcc.fetchBalance();
    typeof currBalance === 'number' &&
      expect(typeof currBalance).toEqual('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAcc = getBankAccount(balance);
    const anotherBalance = 500;

    jest.spyOn(bankAcc, 'fetchBalance').mockResolvedValueOnce(anotherBalance);

    await bankAcc.synchronizeBalance();
    expect(bankAcc.getBalance()).toEqual(anotherBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAcc = getBankAccount(balance);
    const errBalance = null;

    jest.spyOn(bankAcc, 'fetchBalance').mockResolvedValueOnce(errBalance);
    await expect(bankAcc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
