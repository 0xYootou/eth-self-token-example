/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Ownable, OwnableInterface } from "../Ownable";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "MinterAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "MinterRemoved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "addMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isMinter",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061002933600061002e60201b6100fd1790919060201c565b610066565b6001600160a01b03811661004157600080fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b610203806100756000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063983b2d5614610046578063986502751461005b578063aa271e1a14610063575b600080fd5b61005961005436600461019f565b61008a565b005b6100596100de565b61007661007136600461019f565b6100eb565b604051901515815260200160405180910390f35b610093336100eb565b61009c57600080fd5b6100a76000826100fd565b6040516001600160a01b038216907f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f690600090a250565b6100e9600033610135565b565b60006100f7818361016a565b92915050565b6001600160a01b03811661011057600080fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b6001600160a01b03811661014857600080fd5b6001600160a01b0316600090815260209190915260409020805460ff19169055565b60006001600160a01b03821661017f57600080fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b6000602082840312156101b0578081fd5b81356001600160a01b03811681146101c6578182fd5b939250505056fea2646970667358221220ec853b0824305954b56e47e25d1537a951a58c0d78612456114e59edbde84f8564736f6c63430008040033";

type OwnableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OwnableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Ownable__factory extends ContractFactory {
  constructor(...args: OwnableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Ownable";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Ownable> {
    return super.deploy(overrides || {}) as Promise<Ownable>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Ownable {
    return super.attach(address) as Ownable;
  }
  connect(signer: Signer): Ownable__factory {
    return super.connect(signer) as Ownable__factory;
  }
  static readonly contractName: "Ownable";
  public readonly contractName: "Ownable";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OwnableInterface {
    return new utils.Interface(_abi) as OwnableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Ownable {
    return new Contract(address, _abi, signerOrProvider) as Ownable;
  }
}