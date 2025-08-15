import UsernameInput from "~/components/username-input";
import type { Route } from "../+types/root";
import Button from "~/components/button";
import { Card, InputGroup, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { AccountUtils } from "~/hive-utils/account-utils";
import RecoveryAccountCard from "~/components/cards/recovery-account-card";
import {
  getRowByUsername,
  type RecoveryAccountRow,
} from "~/utils/spreadsheet-utils/speadsheet-utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hive Account Recovery" },
    { name: "description", content: "Hive Account Recovery" },
  ];
}

export default function AccountRecovery() {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [recoveryAccountUsername, setRecoveryAccountUsername] =
    useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recoveryAccountData, setRecoveryAccountData] = useState<
    RecoveryAccountRow | undefined
  >(undefined);
  const getAccount = async (username: string) => {
    const recAccountUsername = await AccountUtils.getRecoveryAccount(username);
    setRecoveryAccountUsername(recAccountUsername);
  };

  useEffect(() => {
    if (recoveryAccountUsername) {
      setIsLoading(true);
      getRowByUsername(recoveryAccountUsername)
        .then((row) => {
          if (row) {
            setRecoveryAccountData(row);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [recoveryAccountUsername]);

  return (
    <div className="container mt-4 d-flex flex-column justify-content-center align-items-center">
      <Card className="w-100" style={{ maxWidth: "500px" }}>
        <Card.Header>
          <Card.Title>Account Recovery</Card.Title>
          <Card.Text>Enter your username to recover your account.</Card.Text>
        </Card.Header>
        <Card.Body>
          <div className="row justify-content-center">
            <InputGroup className="w-100" style={{ maxWidth: "500px" }}>
              <InputGroup.Text>@</InputGroup.Text>
              <UsernameInput
                onChangeCallback={setUsernameInput}
                onEnterCallback={() => getAccount(usernameInput)}
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
          <div className="row justify-content-center mt-3 ">
            {isLoading ? (
              <div className="d-flex flex-column align-items-center">
                <Spinner />
                <p>Fetching recovery account...</p>
              </div>
            ) : (
              recoveryAccountData && (
                <RecoveryAccountCard recoveryAccount={recoveryAccountData} />
              )
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
