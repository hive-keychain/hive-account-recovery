import { Card } from "react-bootstrap";
import RecoveryAccountAvatar from "~/components/recovery-account-avatar";
import type { RecoveryAccountRow } from "~/utils/spreadsheet-utils/speadsheet-utils";

export default function RecoveryAccountCard({
  recoveryAccount,
}: {
  recoveryAccount: RecoveryAccountRow;
}) {
  return (
    <Card>
      <Card.Header>Recovery Account</Card.Header>
      <Card.Body>
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex align-items-center gap-2">
            <div>
              <RecoveryAccountAvatar
                accountName={recoveryAccount.accountRecoveryName}
              />
            </div>
            <h4 className="mb-0">@{recoveryAccount.accountRecoveryName}</h4>
          </div>
          <div className="mt-2 text-center w-100">
            <a
              href={recoveryAccount.recoveryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-block"
            >
              {recoveryAccount.description}
            </a>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
