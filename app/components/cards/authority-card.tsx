import { Card } from "react-bootstrap";
import type { AuthorityType, PublicKey } from "@hiveio/dhive";
import { AuthListGroup } from "../auth-list-group";

export interface AuthorityCardProps {
  name: string;
  authority?: AuthorityType;
  memoKey?: string | PublicKey;
}
export const AuthorityCard = ({
  name,
  authority,
  memoKey,
}: AuthorityCardProps) => {
  return (
    <Card className="mb-2">
      <Card.Header>
        <Card.Title>{name}</Card.Title>
      </Card.Header>
      <Card.Body>
        {authority && authority.account_auths.length > 0 && (
          <>
            <Card.Title>Accounts</Card.Title>
            <AuthListGroup type="account" authority={authority} />
          </>
        )}
        {authority && authority.key_auths.length > 0 && (
          <>
            <Card.Title>Keys</Card.Title>
            <AuthListGroup type="key" authority={authority} />
          </>
        )}
        {memoKey && (
          <>
            <Card.Text>{memoKey.toString()}</Card.Text>
          </>
        )}
      </Card.Body>
    </Card>
  );
};
