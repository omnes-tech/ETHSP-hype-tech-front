/* eslint-disable no-console */
import type SmartAccount from "@biconomy/smart-account";
import { ethers } from "ethers";
import { toast } from "react-toastify";

import { IDbuilder } from "@/utils";

type ContractConfig = {
  polygon: {
    contractAddress: string;
    abi: typeof IDbuilder.mumbai.abi;
  };
};

export class NFTManager {
  private isTransactionPending = false;

  private nftInterface = new ethers.utils.Interface([
    "function mintLegalEng() ",
    "function safeTransferFrom(address from, address to, uint256 tokenId)",
  ]);

  private contractConfig: ContractConfig = {
    polygon: {
      contractAddress: "0x60cb723638F073142994a73130dd2bf7f96e7154",
      abi: IDbuilder.mumbai.abi,
    },
  };

  private smartAccount: SmartAccount;

  constructor(smartAccount: SmartAccount) {
    this.contractConfig = {
      polygon: {
        contractAddress: IDbuilder.mumbai.contractAddress,
        abi: IDbuilder.mumbai.abi,
      },
    };
    this.smartAccount = smartAccount;
  }

  private generateMintData(): any {
    const data = this.nftInterface.encodeFunctionData("mintLegalEng");
    const tx = {
      to: this.contractConfig.polygon.contractAddress,
      data,
    };
    return tx;
  }

  private generateTransferData(
    address: string,
    addressSigner: `0x${string}`,
    tokenId: number
  ): any {
    const data = this.nftInterface.encodeFunctionData("safeTransferFrom", [
      address,
      addressSigner,
      tokenId,
    ]);
    const tx = {
      to: this.contractConfig.polygon.contractAddress,
      data,
    };
    return tx;
  }

  private async sendTransactions(TxData: any[]) {
    this.isTransactionPending = true;

    if (this.smartAccount) {
      this.smartAccount.on("txHashGenerated", (response: any) => {
        toast.info(`txHashGenerated event received via emitter ${response}`);
      });

      this.smartAccount.on("txMined", async (response: any) => {
        toast.info(`txMined event received via emitter ${response}`);
        this.isTransactionPending = false;
      });

      this.smartAccount.on("error", (response: any) => {
        toast.error("error event received via emitter", response);
      });

      const txResponse = await this.smartAccount.sendTransactionBatch({
        transactions: TxData,
      });

      toast.info(`Gerando o hash de transação: ${txResponse}`);

      const txReciept = await txResponse.wait();
      toast.success(`Seu NFT foi Mintado com sucesso!`);
      toast.success(`Hash Minerado: ${txReciept.transactionHash}`);
      this.isTransactionPending = false;
      return txReciept.transactionHash;
    }

    return null;
  }

  public async mintNFT(addressSigner: `0x${string}`, tokenId: number) {
    if (this.smartAccount) {
      const txGenerateMintData = this.generateMintData();
      const txGenerateTransferData = this.generateTransferData(
        this.smartAccount.address,
        addressSigner,
        tokenId
      );
      const tx = await this.sendTransactions([
        txGenerateMintData,
        txGenerateTransferData,
      ]);
      return tx;
    }

    return null;
  }

  public isTransactionInProgress() {
    return this.isTransactionPending;
  }
}
