import BigNumber from 'bignumber.js';
import { AccountAddress } from './wallet/Accounts';
import { Uint64LE } from 'int64-buffer';

interface LibraProgram {
  code: Uint8Array;
  arguments: LibraProgramArgument[];
  modules: Uint8Array[];
}

interface LibraProgramArgument {
  type: string;
  value: Uint8Array;
}

interface LibraGasConstraint {
  maxGasAmount: BigNumber;
  gasUnitPrice: BigNumber;
}

export class LibraTransaction {
  public static createTransfer(receipientAddress: string, numCoins: BigNumber): LibraTransaction {
    return new LibraTransaction(
      {
        code: new Uint8Array([
          76,
          73,
          66,
          82,
          65,
          86,
          77,
          10,
          1,
          0,
          7,
          1,
          74,
          0,
          0,
          0,
          4,
          0,
          0,
          0,
          3,
          78,
          0,
          0,
          0,
          6,
          0,
          0,
          0,
          12,
          84,
          0,
          0,
          0,
          5,
          0,
          0,
          0,
          13,
          89,
          0,
          0,
          0,
          4,
          0,
          0,
          0,
          5,
          93,
          0,
          0,
          0,
          41,
          0,
          0,
          0,
          4,
          134,
          0,
          0,
          0,
          32,
          0,
          0,
          0,
          7,
          166,
          0,
          0,
          0,
          13,
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          2,
          0,
          1,
          3,
          0,
          2,
          0,
          2,
          4,
          2,
          3,
          2,
          4,
          2,
          6,
          60,
          83,
          69,
          76,
          70,
          62,
          12,
          76,
          105,
          98,
          114,
          97,
          65,
          99,
          99,
          111,
          117,
          110,
          116,
          4,
          109,
          97,
          105,
          110,
          15,
          112,
          97,
          121,
          95,
          102,
          114,
          111,
          109,
          95,
          115,
          101,
          110,
          100,
          101,
          114,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          2,
          0,
          4,
          0,
          12,
          0,
          12,
          1,
          17,
          1,
          2,
        ]),
        arguments: [
          {
            type: 'ADDRESS',
            value: new Uint8Array(
              (receipientAddress.match(/.{1,2}/g) as RegExpMatchArray).map(byte => parseInt(byte, 16)),
            ),
          },
          {
            type: 'U64',
            value: new Uint8Array(new Uint64LE(numCoins.toNumber()).toArray()),
          },
        ],
        modules: [],
      },
      { maxGasAmount: new BigNumber('10000'), gasUnitPrice: new BigNumber('0') },
      // '1561906398',
      '1661898073',
      // new Uint8Array([
      //   119,
      //   19,
      //   139,
      //   94,
      //   255,
      //   209,
      //   178,
      //   225,
      //   194,
      //   27,
      //   126,
      //   220,
      //   147,
      //   55,
      //   86,
      //   246,
      //   30,
      //   51,
      //   216,
      //   169,
      //   226,
      //   149,
      //   153,
      //   20,
      //   64,
      //   96,
      //   250,
      //   91,
      //   133,
      //   224,
      //   211,
      //   144,
      // ]),
      // '6',
      '-1',
    );
    throw new Error('Method not implemented. Still working on compiling and encoding programs');
  }
  public program: LibraProgram;
  public gasContraint: LibraGasConstraint;
  public expirationTime: BigNumber;
  public sendersAddress: AccountAddress;
  public sequenceNumber: BigNumber;

  /**
   * Create a new Transaction
   *
   * @param program
   * @param gasConstraint
   * @param expirationTime
   * @param sendersAddress
   * @param sequenceNumber
   */
  constructor(
    program: LibraProgram,
    gasConstraint: LibraGasConstraint,
    expirationTime: string | BigNumber,
    // sendersAddress: Uint8Array,
    sequenceNumber: string | BigNumber,
  ) {
    this.program = program;
    this.gasContraint = gasConstraint;
    this.expirationTime = new BigNumber(expirationTime);
    this.sendersAddress = AccountAddress.default();
    // this.sendersAddress = new AccountAddress(sendersAddress);
    this.sequenceNumber = new BigNumber(sequenceNumber);
  }
}
