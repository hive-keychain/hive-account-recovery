import type { AuthorityType } from "@hiveio/dhive";
import { Col, ListGroup, Row } from "react-bootstrap";

export interface AuthListGroupProps {
  type: "account" | "key";
  authority: AuthorityType;
}
export const AuthListGroup = ({ type, authority }: AuthListGroupProps) => {
  const auths =
    type === "account" ? authority.account_auths : authority.key_auths;
  return (
    <ListGroup className="my-2">
      <ListGroup.Item variant="secondary">
        <Row>
          <Col>
            <strong>{type === "account" ? "Account" : "Key"}</strong>
          </Col>
          <Col className="text-end">
            <strong>Weight</strong>
          </Col>
        </Row>
      </ListGroup.Item>
      {auths.map(([account, weight], index) => (
        <ListGroup.Item key={index}>
          <Row>
            <Col>{type === "account" ? `@${account}` : account.toString()}</Col>
            <Col className="text-end">{weight}</Col>
          </Row>
        </ListGroup.Item>
      ))}
      <ListGroup.Item key={type + " threshold"} variant="light">
        <Row>
          <Col>
            <strong>Weight Threshold</strong>
          </Col>
          <Col className="text-end">{authority.weight_threshold}</Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
};
