import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import type { IAuthorities } from "~/interfaces/account.interface";
import { AccountUtils } from "~/utils/hive-utils/account-utils";
import { useEffect, useState } from "react";
import { AuthorityCard } from "../cards/authority-card";
import { Spinner } from "react-bootstrap";
import BroadcastUpdateModal from "./broadcast-update-modal";

export interface AccountUpdateModalProps {
  username: string;
  updatedAccountData: IAuthorities;
  show: boolean;
  onCancel: () => void;
  onUpdate: () => void;
}

export default function AccountUpdateModal({
  username,
  updatedAccountData,
  show,
  onCancel,
  onUpdate,
}: AccountUpdateModalProps) {
  return (
    <>
      <Modal size="lg" centered show={show} onHide={onCancel}>
        <Modal.Header>
          <Modal.Title>Account Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {updatedAccountData ? (
            <div>
              <p>
                Are you sure you want to update the account <b>@{username}</b>{" "}
                with the following authorities?
              </p>
              <div>
                <AuthorityCard
                  name="Owner"
                  authority={updatedAccountData.owner}
                />
                <AuthorityCard
                  name="Active"
                  authority={updatedAccountData.active}
                />
                <AuthorityCard
                  name="Posting"
                  authority={updatedAccountData.posting}
                />
                <AuthorityCard
                  name="Memo Key"
                  memoKey={updatedAccountData.memo_key}
                />
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner />
              <p>Fetching account data...</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="outline-primary" onClick={onUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
