import UsernameInput from "~/components/username-input";
import type { Route } from "../+types/root";
import Button from "~/components/button";
import { Card, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { AccountUtils } from "~/hive-utils/account-utils";
import RecoveryAccountCard from "~/components/cards/recovery-account-card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hive Account Recovery" },
    { name: "description", content: "Hive Account Recovery" },
  ];
}

export default function AccountRecovery() {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [recoveryAccount, setRecoveryAccount] = useState<string>("");
  const getAccount = async (username: string) => {
    const recoveryAccount = await AccountUtils.getRecoveryAccount(username);
    setRecoveryAccount(recoveryAccount);
  };

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
              <UsernameInput onChangeCallback={setUsernameInput} />
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
            {recoveryAccount && (
              <RecoveryAccountCard recoveryAccount={recoveryAccount} />
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
