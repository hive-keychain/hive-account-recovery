import * as Hive from "@hiveio/dhive";

export interface IAuthorities {
  account: string;
  owner: Hive.AuthorityType;
  active: Hive.AuthorityType;
  posting: Hive.AuthorityType;
  memo_key: string | Hive.PublicKey;
  json_metadata: string;
}
