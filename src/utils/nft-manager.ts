import { IDbuilder } from "@/utils";
/* eslint-disable no-console */
import type SmartAccount from "@biconomy/smart-account";
import { ethers } from "ethers";
import { toast } from "react-toastify";

type ContractConfig = {
  polygonMumbai: {
    contractAddress: string;
    abi: typeof IDbuilder.mumbai.abi;
  };
};

export class NFTManager {
  private isTransactionPending = false;

  private nftInterface = new ethers.utils.Interface([
    "function mintBuilder(string memory _email, bool _student, bool _teacher)",
    "function safeTransferFrom(address from, address to, uint256 tokenId)",
  ]);

  private contractConfig: ContractConfig = {
    polygonMumbai: {
      contractAddress: IDbuilder.mumbai.contractAddress,
      abi: IDbuilder.mumbai.abi,
    },
  };

  private smartAccount: SmartAccount;

  constructor(smartAccount: SmartAccount) {
    this.contractConfig = {
      polygonMumbai: {
        contractAddress: IDbuilder.mumbai.contractAddress,
        abi: IDbuilder.mumbai.abi,
      },
    };
    this.smartAccount = smartAccount;
  }

  private generateMintData(
    email: string,
    isStudant: boolean,
    isProf: boolean
  ): any {
    const data = this.nftInterface.encodeFunctionData("mintBuilder", [
      email,
      isStudant,
      isProf,
    ]);
    const tx = {
      to: this.contractConfig.polygonMumbai.contractAddress,
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
      to: this.contractConfig.polygonMumbai.contractAddress,
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

  public async mintNFT(
    addressSigner: `0x${string}`,
    email: string,
    isStudant: boolean,
    isProf: boolean,
    tokenId: number
  ) {
    if (this.smartAccount) {
      const txGenerateMintData = this.generateMintData(
        email,
        isStudant,
        isProf
      );
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
