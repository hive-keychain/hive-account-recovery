import * as Hive from "@hiveio/dhive";
import { Client, PrivateKey } from "@hiveio/dhive";
import type { IAuthorities } from "~/interfaces/account.interface";
import bs58 from "bs58";
import { SHA256, enc, lib } from "crypto-js";
import { Buffer } from "buffer";
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
  try {
    client = getClient();
    const account = await client.database.getAccounts([username]);
    return account[0].recovery_account;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const getPrivateKeyFromSeed = (seed: string): Hive.PrivateKey => {
  return PrivateKey.fromSeed(seed);
};
const generateMasterKey = () => {
  const array = new Uint32Array(10);
  crypto.getRandomValues(array);
  return "P" + PrivateKey.fromSeed(array.toString()).toString();
};
const generateNewSetOfKeys = (username: string) => {
  const masterPassword = generateMasterKey();
  const ownerPrivateKey = PrivateKey.fromLogin(
    username,
    masterPassword,
    "owner"
  );
  const activePrivateKey = PrivateKey.fromLogin(
    username,
    masterPassword,
    "active"
  );
  const postingPrivateKey = PrivateKey.fromLogin(
    username,
    masterPassword,
    "posting"
  );
  const memoPrivateKey = PrivateKey.fromLogin(username, masterPassword, "memo");

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
  password: string
) => {
  const client = getClient();
  const wif = isWif(password);
  if (wif) {
    const result = await client.broadcast.updateAccount(
      newAuthorities,
      Hive.PrivateKey.fromString(password)
    );
    return result;
  }
  const owner = derivateFromMasterPassword(newAuthorities.account, password);
  if (owner) {
    const result = await client.broadcast.updateAccount(newAuthorities, owner);
    return result;
  }
  throw new Error("Invalid password: Neither WIF nor master password format");
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

const getAccountAvatarUrl = async (username: string): Promise<string> => {
  return "https://images.hive.blog/u/" + username + "/avatar";
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

const derivateFromMasterPassword = (
  username: string,
  password: string
): Hive.PrivateKey | null => {
  const owner = PrivateKey.fromLogin(username, password, "owner");
  return owner;
};
const sha256 = (input: any): Buffer => {
  if (typeof input !== "string") {
    input = lib.WordArray.create(input);
  }
  const hash = Buffer.from(SHA256(input).toString(enc.Hex), "hex");
  return hash;
};
const isWif = (privWif: string | Buffer): boolean => {
  try {
    const bufWif = Buffer.from(bs58.decode(privWif as string));
    const privKey = bufWif.slice(0, -4);
    const checksum = bufWif.slice(-4);
    let newChecksum = sha256(privKey);
    newChecksum = sha256(newChecksum);
    newChecksum = newChecksum.slice(0, 4);
    return checksum.toString() === newChecksum.toString();
  } catch (e) {
    console.error(e);
    return false;
  }
};
export const AccountUtils = {
  getAccount,
  getRecoveryAccount,
  getPrivateKeyFromSeed,
  generateNewSetOfKeys,
  accountUpdateBroadcast,
  createNewAuthoritiesFromKeys,
  getUpdatedAccountData,
  getAccountAvatarUrl,
};
