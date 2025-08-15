import { useEffect, useState } from "react";
import { Card, InputGroup } from "react-bootstrap";
import Button from "~/components/button";
import NewKeysCard from "~/components/cards/new-keys-card";
import CheckBox from "~/components/check-box";
import UsernameInput from "~/components/username-input";
import { AccountUtils } from "~/hive-utils/account-utils";
import * as Hive from "@hiveio/dhive";

export default function ChangeKeys() {
  const [keysCopied, setKeysCopied] = useState(false);
  const [copyKeysToClipboard, setCopyKeysToClipboard] = useState(false);
  const [understandKeysOutsideKeychain, setUnderstandKeysOutsideKeychain] =
    useState(false);
  const [newKeys, setNewKeys] = useState<{
    masterPassword: Hive.PrivateKey;
    ownerPrivateKey: Hive.PrivateKey;
    activePrivateKey: Hive.PrivateKey;
    postingPrivateKey: Hive.PrivateKey;
    memoPrivateKey: Hive.PrivateKey;
  } | null>(null);
  const [usernameInput, setUsernameInput] = useState("");

  const generateKeys = async (username: string) => {
    setUnderstandKeysOutsideKeychain(false);
    setCopyKeysToClipboard(false);
    setKeysCopied(false);
    const {
      masterPassword,
      ownerPrivateKey,
      activePrivateKey,
      postingPrivateKey,
      memoPrivateKey,
    } = AccountUtils.generateNewSetOfKeys(username);

    const keys = {
      masterPassword,
      ownerPrivateKey,
      activePrivateKey,
      postingPrivateKey,
      memoPrivateKey,
    };
    setNewKeys(keys);
  };

  const crossCheckIfCopyKeysToClipboard = () => {
    if (!keysCopied) {
      alert("Please copy the keys to clipboard first.");
      return false;
    }
    return true;
  };
  return (
    <div className="container mt-4 d-flex flex-column justify-content-center align-items-center">
      <Card className="w-100" style={{ maxWidth: "700px" }}>
        <Card.Header>
          <Card.Title>Change Keys</Card.Title>
          <Card.Text>Enter your username to change your keys.</Card.Text>
        </Card.Header>
        <Card.Body>
          <div className="row justify-content-center">
            <InputGroup className="w-100" style={{ maxWidth: "500px" }}>
              <InputGroup.Text>@</InputGroup.Text>
              <UsernameInput
                onChangeCallback={setUsernameInput}
                onEnterCallback={() => generateKeys(usernameInput)}
                value={usernameInput}
              />
              <Button
                variant="outline-secondary"
                onClick={() => {
                  generateKeys(usernameInput);
                }}
              >
                Generate Keys
              </Button>
            </InputGroup>
          </div>
          {newKeys && (
            <div>
              <div className="mt-3">
                <NewKeysCard
                  username={usernameInput}
                  keys={[
                    {
                      name: "Master Password",
                      masterPassword: newKeys?.masterPassword.toString(),
                      privateKey: undefined,
                      publicKey: undefined,
                    },
                    ...["Owner", "Active", "Posting", "Memo"].map((role) => {
                      const keyName = role.toLowerCase() + "PrivateKey";
                      return {
                        name: role,
                        masterPassword: undefined,
                        privateKey:
                          newKeys?.[
                            keyName as keyof typeof newKeys
                          ]?.toString(),
                        publicKey: newKeys?.[keyName as keyof typeof newKeys]
                          ?.createPublic()
                          .toString(),
                      };
                    }),
                  ]}
                  copyKeysToClipboardClickedCallback={() => setKeysCopied(true)}
                />
              </div>
              <div className="mt-3">
                <CheckBox
                  label="I have safely copied the keys and saved them outside of Keychain"
                  checked={copyKeysToClipboard}
                  onChange={(checked) => {
                    if (checked) {
                      if (crossCheckIfCopyKeysToClipboard()) {
                        setCopyKeysToClipboard(checked);
                      }
                    }
                  }}
                />
                <CheckBox
                  label="I understand that Keychain should not be considered as the primary place of storage for my keys"
                  checked={understandKeysOutsideKeychain}
                  onChange={(checked) =>
                    setUnderstandKeysOutsideKeychain(checked)
                  }
                />
              </div>
              <div className="mt-1 d-flex justify-content-end">
                <Button
                  variant={
                    understandKeysOutsideKeychain && copyKeysToClipboard
                      ? "outline-primary"
                      : "outline-secondary"
                  }
                  onClick={() => {}}
                  disabled={
                    !(understandKeysOutsideKeychain && copyKeysToClipboard)
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
