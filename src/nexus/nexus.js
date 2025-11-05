import { NexusSDK } from "@avail-project/nexus-core";

const sdk = new NexusSDK({ network: "mainnet" });

export async function initNexus(provider) {
  await sdk.initialize(provider);
}
