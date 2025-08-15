import { Client } from "@hiveio/dhive";
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

export const AccountUtils = {
  getAccount,
  getRecoveryAccount,
};  
