import { Client, PrivateKey } from "@hiveio/dhive";
import * as Hive from "@hiveio/dhive";

let client: Client;
const getClient = () => {
  if (!client)
    client = new Client([
      "https://api.hive.blog",
      "https://api.hivekings.com",
      "https://api.deathwing.me",
      "https://anyx.io",
      "https://api.openhive.network",
    ]);
  return client;
};

const getAccount = async (username: string) => {
  client = getClient();
  return client.database.getAccounts([username]);
};

const getRecoveryAccount = async (username: string) => {
  client = getClient();
  const account = await client.database.getAccounts([username]);
  return account[0].recovery_account;
};

const getPrivateKeyFromSeed = (seed: string): Hive.PrivateKey => {
  return PrivateKey.fromSeed(seed);
};
const generateNewSetOfKeys = (username: string) => {
  const masterPasswordSeed = username + Date.now() + Math.random();
  const ownerPrivateKeySeed = username + Date.now() + Math.random();
  const activePrivateKeySeed = username + Date.now() + Math.random();
  const postingPrivateKeySeed = username + Date.now() + Math.random();
  const memoPrivateKeySeed = username + Date.now() + Math.random();

  const masterPassword = getPrivateKeyFromSeed(masterPasswordSeed);
  const ownerPrivateKey = getPrivateKeyFromSeed(ownerPrivateKeySeed);
  const activePrivateKey = getPrivateKeyFromSeed(activePrivateKeySeed);
  const postingPrivateKey = getPrivateKeyFromSeed(postingPrivateKeySeed);
  const memoPrivateKey = getPrivateKeyFromSeed(memoPrivateKeySeed);
  return { masterPassword, ownerPrivateKey, activePrivateKey, postingPrivateKey, memoPrivateKey };
};

export const AccountUtils = {
  getAccount,
  getRecoveryAccount,
  getPrivateKeyFromSeed,
  generateNewSetOfKeys,
};  
