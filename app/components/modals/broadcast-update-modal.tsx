import { Modal } from "react-bootstrap";
import type { IAuthorities } from "~/interfaces/account.interface";
import { KeyInput } from "../key-input";
import { useEffect, useState } from "react";
import Button from "../button";
import { AccountUtils } from "~/hive-utils/account-utils";

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
  const handleBroadcastUpdate = async () => {
    const result = await AccountUtils.accountUpdateBroadcast(
      updatedAccountData,
      ownerKey
    );
    setResult(result);
  };

  useEffect(() => {
    if (result && result.id.length > 0) {
      setIsSuccess(true);
    }
  }, [result]);

  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header>
        <Modal.Title>Broadcast Update</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Enter your owner key:</p>
        <KeyInput label="Owner Key" value={ownerKey} onChange={setOwnerKey} />
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
