import { useState } from "react";
import { Card, InputGroup, Spinner } from "react-bootstrap";
import Button from "~/components/button";
import RecoveryAccountCard from "~/components/cards/recovery-account-card";
import RecoveryAccountAvatar from "~/components/recovery-account-avatar";
import UsernameInput from "~/components/username-input";
import { Config } from "~/utils/Config";
import { AccountUtils } from "~/utils/hive-utils/account-utils";
import {
  SpreadsheetUtils,
  type RecoveryAccountRow,
} from "~/utils/spreadsheet-utils/speadsheet-utils";
import type { Route } from "../+types/root";

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
  >("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recoveryAccountData, setRecoveryAccountData] = useState<
    RecoveryAccountRow | undefined
  >(undefined);

  const getAccount = async (username: string) => {
    if (username === "") {
      return;
    }
    try {
      const recAccountUsername =
        await AccountUtils.getRecoveryAccount(username);
      setRecoveryAccountUsername(recAccountUsername);
      if (recAccountUsername && recAccountUsername !== "") {
        setIsLoading(true);
        SpreadsheetUtils.getRecoveryByRecoveryUsernameFromHtmlView(
          Config.spreadsheetUrl,
          recAccountUsername
        )
          .then((row) => {
            if (row) {
              setRecoveryAccountData(row);
            } else {
              setRecoveryAccountData(undefined);
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      console.error(error);
      setRecoveryAccountData(undefined);
    }
  };

  const displayRecoveryAccountData = () => {
    if (recoveryAccountUsername === undefined) {
      return <p>You haven't set a recovery account</p>;
    } else if (recoveryAccountData === undefined && recoveryAccountUsername) {
      return (
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex align-items-center gap-2">
            <div>
              <RecoveryAccountAvatar accountName={recoveryAccountUsername} />
            </div>
            <h4 className="mb-0">@{recoveryAccountUsername}</h4>
          </div>
          <p>
            Your recovery account is @{recoveryAccountUsername}. Please contact
            them to try and recover you account.
          </p>
        </div>
      );
    } else if (recoveryAccountData && recoveryAccountUsername) {
      return <RecoveryAccountCard recoveryAccount={recoveryAccountData} />;
    } else {
      return "";
    }
  };

  return (
    <div className="container mt-4 d-flex flex-column justify-content-center align-items-center">
      <Card className="w-100" style={{ maxWidth: "500px" }}>
        <Card.Header>
          <Card.Title>Account Recovery</Card.Title>
          <Card.Text>
            Enter your username to search for your recovery account.
            <br />
            <br />
            Note that finding your recovery account does not necessarily mean
            that they will be able to help you recover your account.
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
              <>{displayRecoveryAccountData()}</>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
