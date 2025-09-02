import { useEffect, useState } from "react";
import { Image, Placeholder } from "react-bootstrap";
import { AccountUtils } from "~/utils/hive-utils/account-utils";

interface RecoveryAccountAvatarProps {
  accountName: string;
}

export default function RecoveryAccountAvatar({
  accountName,
}: RecoveryAccountAvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      const avatarUrl = await AccountUtils.getAccountAvatarUrl(accountName);
      setAvatarUrl(avatarUrl);
    };
    fetchAvatarUrl();
  }, [accountName]);

  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt="Avatar"
        roundedCircle
        style={{ width: 64, height: 64 }}
      />
    );
  }

  return (
    <Placeholder as="div" animation="glow" className="d-inline-block mb-2">
      <Placeholder
        className="rounded-circle"
        style={{ width: 64, height: 64 }}
      />
    </Placeholder>
  );
}
