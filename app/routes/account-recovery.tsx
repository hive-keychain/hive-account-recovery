import UsernameInput from "~/components/username-input";
import type { Route } from "../+types/root";
import Button from "~/components/button";
import { Card, InputGroup, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { AccountUtils } from "~/utils/hive-utils/account-utils";
import RecoveryAccountCard from "~/components/cards/recovery-account-card";
import {
  SpreadsheetUtils,
  type RecoveryAccountRow,
} from "~/utils/spreadsheet-utils/speadsheet-utils";
import { Config } from "~/utils/Config";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hive Account Recovery" },
    { name: "description", content: "Hive Account Recovery" },
  ];
}

export default function AccountRecovery() {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [recoveryAccountUsername, setRecoveryAccountUsername] = useState<
    string | undefined
  >(undefined);
  const [noRecoveryAccount, setNoRecoveryAccount] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recoveryAccountData, setRecoveryAccountData] = useState<
    RecoveryAccountRow | undefined
  >(undefined);

  const getAccount = async (username: string) => {
    setNoRecoveryAccount(false);
    setRecoveryAccountData(undefined);
    const recAccountUsername = await AccountUtils.getRecoveryAccount(username);
    console.log({ recAccountUsername });
    setRecoveryAccountUsername(recAccountUsername);
  };

  useEffect(() => {
    if (recoveryAccountUsername) {
      setIsLoading(true);
      SpreadsheetUtils.getRecoveryByRecoveryUsernameFromHtmlView(
        Config.spreadsheetUrl,
        recoveryAccountUsername
      )
        .then((row) => {
          if (row) {
            setRecoveryAccountData(row);
            setNoRecoveryAccount(false);
          } else {
            setNoRecoveryAccount(true);
          }
        })
        .finally(() => {
          setIsLoading(false);
          setRecoveryAccountUsername(undefined);
        });
    }
  }, [recoveryAccountUsername]);

  return (
    <div className="container mt-4 d-flex flex-column justify-content-center align-items-center">
      <Card className="w-100" style={{ maxWidth: "500px" }}>
        <Card.Header>
          <Card.Title>Account Recovery</Card.Title>
          <Card.Text>
            Enter your username to search for your recovery account.
          </Card.Text>
        </Card.Header>
        <Card.Body>
          <div className="row justify-content-center">
            <InputGroup className="w-100" style={{ maxWidth: "500px" }}>
              <InputGroup.Text>@</InputGroup.Text>
              <UsernameInput
                onChangeCallback={setUsernameInput}
                onEnterCallback={() => {
                  getAccount(usernameInput);
                }}
                value={usernameInput}
              />
              <Button
                variant="outline-secondary"
                onClick={() => {
                  getAccount(usernameInput);
                }}
              >
                Search
              </Button>
            </InputGroup>
          </div>
          <div className="mt-3 ">
            {isLoading ? (
              <div className="d-flex flex-column align-items-center">
                <Spinner />
                <p>Fetching recovery account...</p>
              </div>
            ) : (
              <>
                {recoveryAccountData && !noRecoveryAccount && (
                  <RecoveryAccountCard recoveryAccount={recoveryAccountData} />
                )}
                {noRecoveryAccount && (
                  <p>No recovery account found for this username.</p>
                )}
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
