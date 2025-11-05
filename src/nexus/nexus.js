import { NexusSDK } from "@avail-project/nexus-core";

const sdk = new NexusSDK({ network: "mainnet" });

export async function initNexus(provider) {
  if (provider) {
    try {
      await sdk.initialize(provider);
    } catch (error) {
      console.error("Error initializing Nexus:", error);
    }
  }
}

export function isNexusInitialized() {
  return sdk.isInitialized();
}

export async function getUnifiedBalances() {
  if (isNexusInitialized()) {
    return sdk.getUnifiedBalances();
  }
  return [
    {
      balance: 0,
      symbol: "USDT",
    },
  ];
}

export async function bridge(data) {
  return sdk.bridgeAndExecute({
    amount: data.amount,
    token: "USDT",
    toChainId: data.toChainId,
    execute: {
      contractAbi: data.contractAbi,
      contractAddress: data.contractAddress,
      functionName: data.functionName,
      buildFunctionParams: data.buildFunctionParams,
      value: data.value,
      enableTransactionPolling: true,
      waitForReceipt: true,
      tokenApproval: {
        token: "USDT",
        amount: data.amount,
      },
    },
  });
}
