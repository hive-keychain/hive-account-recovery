import { useEffect, useState } from "react";
import { Card, Image, Placeholder } from "react-bootstrap";
import { AccountUtils } from "~/hive-utils/account-utils";
import type { RecoveryAccountRow } from "~/utils/spreadsheet-utils/speadsheet-utils";

export default function RecoveryAccountCard({
  recoveryAccount,
}: {
  recoveryAccount: RecoveryAccountRow;
}) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      const avatarUrl = await AccountUtils.getAccountAvatarUrl(
        recoveryAccount.accountRecoveryName
      );
      setAvatarUrl(avatarUrl);
    };
    fetchAvatarUrl();
  }, [recoveryAccount.accountRecoveryName]);

  const recoveryAccountAvatar = avatarUrl ? (
    <Image
      src={avatarUrl}
      alt="Avatar"
      roundedCircle
      style={{ width: 64, height: 64 }}
    />
  ) : (
    <Placeholder as="div" animation="glow" className="d-inline-block mb-2">
      <Placeholder
        className="rounded-circle"
        style={{ width: 64, height: 64 }}
      />
    </Placeholder>
  );
  return (
    <Card>
      <Card.Header>Recovery Account</Card.Header>
      <Card.Body>
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex align-items-center gap-2">
            <div>{recoveryAccountAvatar}</div>
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
