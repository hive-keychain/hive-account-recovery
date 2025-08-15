import { Card } from "react-bootstrap";
import type { RecoveryAccountRow } from "~/utils/spreadsheet-utils/speadsheet-utils";

export default function RecoveryAccountCard({
  recoveryAccount,
}: {
  recoveryAccount: RecoveryAccountRow;
}) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Recovery Account</Card.Title>
        <Card.Text>{recoveryAccount.username}</Card.Text>
        <Card.Text>{recoveryAccount.data}</Card.Text>
        <Card.Text>{recoveryAccount.amount}</Card.Text>
        <Card.Text>{recoveryAccount.expiration}</Card.Text>
      </Card.Body>
    </Card>
  );
}
