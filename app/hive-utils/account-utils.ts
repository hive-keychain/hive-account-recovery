import { Client, PrivateKey } from "@hiveio/dhive";
import * as Hive from "@hiveio/dhive";
import type { IAuthorities } from "~/interfaces/account.interface";

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
  return {
    masterPassword,
    ownerPrivateKey,
    activePrivateKey,
    postingPrivateKey,
    memoPrivateKey,
  };
};

const accountUpdateBroadcast = async (
  newAuthorities: IAuthorities,
  ownerKey: string
) => {
  const client = getClient();
  const result = await client.broadcast.updateAccount(
    newAuthorities,
    Hive.PrivateKey.fromString(ownerKey)
  );
  return result;
};

const createNewAuthoritiesFromKeys = (
  username: string,
  keys: {
    masterPassword: Hive.PrivateKey;
    ownerPrivateKey: Hive.PrivateKey;
    activePrivateKey: Hive.PrivateKey;
    postingPrivateKey: Hive.PrivateKey;
    memoPrivateKey: Hive.PrivateKey;
  }
) => {
  return {
    account: username,
    masterPassword: keys.masterPassword.toString(),
    owner: {
      weight_threshold: 1,
      account_auths: [],
      key_auths: [[keys.ownerPrivateKey.createPublic().toString(), 1]],
    },
    active: {
      weight_threshold: 1,
      account_auths: [],
      key_auths: [[keys.activePrivateKey.createPublic().toString(), 1]],
    },
    posting: {
      weight_threshold: 1,
      account_auths: [],
      key_auths: [[keys.postingPrivateKey.createPublic().toString(), 1]],
    },
    memo_key: keys.memoPrivateKey.createPublic().toString(),
    json_metadata: "",
  } as IAuthorities;
};

const getUpdatedAccountData = async (
  username: string,
  newAuthorities: IAuthorities
): Promise<IAuthorities> => {
  const client = getClient();
  const account = await client.database.getAccounts([username]);
  const newAccountData = {
    account: account[0].name,
    owner: { ...account[0].owner, key_auths: newAuthorities.owner.key_auths },
    active: {
      ...account[0].active,
      key_auths: newAuthorities.active.key_auths,
    },
    posting: {
      ...account[0].posting,
      key_auths: newAuthorities.posting.key_auths,
    },
    memo_key: newAuthorities.memo_key,
    json_metadata: account[0].json_metadata,
  };
  return newAccountData;
};

export const AccountUtils = {
  getAccount,
  getRecoveryAccount,
  getPrivateKeyFromSeed,
  generateNewSetOfKeys,
  accountUpdateBroadcast,
  createNewAuthoritiesFromKeys,
  getUpdatedAccountData,
};
