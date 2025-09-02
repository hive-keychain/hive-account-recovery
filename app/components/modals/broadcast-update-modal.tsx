import { Modal } from "react-bootstrap";
import type { IAuthorities } from "~/interfaces/account.interface";
import { KeyInput } from "../key-input";
import { useEffect, useState } from "react";
import Button from "../button";
import { AccountUtils } from "~/utils/hive-utils/account-utils";

export interface BroadcastUpdateModalProps {
  updatedAccountData: IAuthorities;
  onCancel: () => void;
  show: boolean;
}

export default function BroadcastUpdateModal({
  updatedAccountData,
  onCancel,
  show,
}: BroadcastUpdateModalProps) {
  const [ownerKey, setOwnerKey] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleBroadcastUpdate = async () => {
    try {
      const result = await AccountUtils.accountUpdateBroadcast(
        updatedAccountData,
        ownerKey
      );
      setResult(result);
    } catch (e) {
      console.error(e);
      if (e instanceof Error && e.message.includes("Missing Owner Authority")) {
        setInvalidPassword(true);
        setErrorMessage("Invalid owner key or master password");
      } else if (
        e instanceof Error &&
        e.message.includes("Owner authority can only be updated twice an hour.")
      ) {
        setInvalidPassword(true);
        setErrorMessage("Owner authority can only be updated twice an hour.");
      }
    }
  };

  useEffect(() => {
    if (result && result.id.length > 0) {
      setInvalidPassword(false);
      setIsSuccess(true);
    }
  }, [result]);

  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header>
        <Modal.Title>Broadcast Update</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {invalidPassword && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <p>Enter your owner key or master password:</p>
        <KeyInput value={ownerKey} onChange={setOwnerKey} />
        <div className="mt-3 d-flex justify-content-end">
          <Button variant="outline-primary" onClick={handleBroadcastUpdate}>
            Broadcast Update
          </Button>
        </div>
        {isSuccess && (
          <div className="mt-3">
            <p>Transaction Broadcasted Successfully!</p>
            <p>Transaction ID: {result.id}</p>
            <p>
              <a
                href={`https://hivehub.dev/tx/${result.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on HiveHub
              </a>
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
