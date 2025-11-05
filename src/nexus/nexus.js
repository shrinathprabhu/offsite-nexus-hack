import { NexusSDK } from "@avail-project/nexus-core";

const sdk = new NexusSDK({ network: "mainnet" });

export async function initNexus(provider) {
  if (provider) {
    try {
      console.log("initNexus", provider);
      await sdk.initialize(provider);
    } catch (e) {
      console.log("You can still play the game without Nexus");
    }
  }
}

export function isInitialized() {
  return sdk.isInitialized();
}

export async function getUnifiedBalances() {
  console.log("getUnifiedBalances", isInitialized());
  if (isInitialized()) {
    return sdk.getUnifiedBalances();
  } else {
    return [
      {
        symbol: "USDT",
        balance: 0,
      },
    ];
  }
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

export async function investInOpps(scores) {
  for (const score of scores) {
    if (score.score > 0) {
      await bridge({
        amount: score.score,
        toChainId: score.chainId,
        contractAbi: score.contractAbi,
        contractAddress: score.contractAddress,
        functionName: score.functionName,
        buildFunctionParams: score.buildFunctionParams,
        value: score.value,
      });
    }
  }
}
