import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button as Button$1, Image, Placeholder, Card, Form, InputGroup, Spinner, ListGroup, Row, Col, Modal } from "react-bootstrap";
import * as Hive from "@hiveio/dhive";
import { PrivateKey, Client } from "@hiveio/dhive";
import "papaparse";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function NavBar() {
  const [expanded, setExpanded] = useState(false);
  return /* @__PURE__ */ jsx(
    Navbar,
    {
      expand: "lg",
      bg: "dark",
      variant: "dark",
      sticky: "top",
      className: "shadow-sm border-bottom",
      style: { minHeight: "60px" },
      children: /* @__PURE__ */ jsxs(Container, { fluid: true, children: [
        /* @__PURE__ */ jsx(
          Navbar.Brand,
          {
            className: "d-flex align-items-center",
            style: {
              padding: "8px 0",
              marginRight: "20px"
            },
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/logohive.png",
                alt: "Hive Logo",
                style: {
                  height: "40px",
                  width: "auto"
                }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(Nav, { className: "me-auto", children: [
          /* @__PURE__ */ jsx(Nav.Link, { href: "/", children: "Account Recovery" }),
          /* @__PURE__ */ jsx(Nav.Link, { href: "/change-keys", children: "Change Keys" })
        ] })
      ] })
    }
  );
}
const Footer = () => {
  return /* @__PURE__ */ jsx(
    "footer",
    {
      className: "text-dark py-3 mt-auto",
      style: {
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 1e3
      },
      children: /* @__PURE__ */ jsx("div", { className: "container text-center", children: /* @__PURE__ */ jsx("div", { className: "footer-text", children: "@2025 Hive Keychain" }) })
    }
  );
};
const links = () => [{
  rel: "icon",
  href: "/logohive.png",
  type: "image/png"
}, {
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      style: {
        paddingBottom: "80px"
      },
      children: [/* @__PURE__ */ jsx(NavBar, {}), children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {}), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Button({
  className = "",
  style = {},
  variant = "outline-secondary",
  size,
  disabled = false,
  onClick,
  children = "Button"
}) {
  return /* @__PURE__ */ jsx(
    Button$1,
    {
      className,
      style,
      variant,
      size,
      disabled,
      onClick,
      children
    }
  );
}
let client;
const getClient = () => {
  if (!client)
    client = new Client([
      "https://api.hive.blog",
      "https://api.hivekings.com",
      "https://api.deathwing.me",
      "https://anyx.io",
      "https://api.openhive.network"
    ]);
  return client;
};
const getAccount = async (username) => {
  client = getClient();
  return client.database.getAccounts([username]);
};
const getRecoveryAccount = async (username) => {
  try {
    client = getClient();
    const account = await client.database.getAccounts([username]);
    return account[0].recovery_account;
  } catch (error) {
    console.error(error);
    return void 0;
  }
};
const getPrivateKeyFromSeed = (seed) => {
  return PrivateKey.fromSeed(seed);
};
const generateNewSetOfKeys = (username) => {
  const masterPasswordSeed = username + Date.now() + Math.random();
  const ownerPrivateKeySeed = username + Date.now() + Math.random();
  const activePrivateKeySeed = username + Date.now() + Math.random();
  const postingPrivateKeySeed = username + Date.now() + Math.random();
  const memoPrivateKeySeed = username + Date.now() + Math.random();
  const masterPassword = getPrivateKeyFromSeed(masterPasswordSeed);
  const ownerPrivateKey = getPrivateKeyFromSeed(ownerPrivateKeySeed);
  const activePrivateKey = getPrivateKeyFromSeed(activePrivateKeySeed);
  const postingPrivateKey = getPrivateKeyFromSeed(postingPrivateKeySeed);
  const memoPrivateKey = getPrivateKeyFromSeed(memoPrivateKeySeed);
  return {
    masterPassword,
    ownerPrivateKey,
    activePrivateKey,
    postingPrivateKey,
    memoPrivateKey
  };
};
const accountUpdateBroadcast = async (newAuthorities, ownerKey) => {
  const client2 = getClient();
  const result = await client2.broadcast.updateAccount(
    newAuthorities,
    Hive.PrivateKey.fromString(ownerKey)
  );
  return result;
};
const createNewAuthoritiesFromKeys = (username, keys) => {
  return {
    account: username,
    masterPassword: keys.masterPassword.toString(),
    owner: {
      weight_threshold: 1,
      account_auths: [],
      key_auths: [[keys.ownerPrivateKey.createPublic().toString(), 1]]
    },
    active: {
      weight_threshold: 1,
      account_auths: [],
      key_auths: [[keys.activePrivateKey.createPublic().toString(), 1]]
    },
    posting: {
      weight_threshold: 1,
      account_auths: [],
      key_auths: [[keys.postingPrivateKey.createPublic().toString(), 1]]
    },
    memo_key: keys.memoPrivateKey.createPublic().toString(),
    json_metadata: ""
  };
};
const getAccountAvatarUrl = async (username) => {
  return "https://images.hive.blog/u/" + username + "/avatar";
};
const getUpdatedAccountData = async (username, newAuthorities) => {
  const client2 = getClient();
  const account = await client2.database.getAccounts([username]);
  const newAccountData = {
    account: account[0].name,
    owner: { ...account[0].owner, key_auths: newAuthorities.owner.key_auths },
    active: {
      ...account[0].active,
      key_auths: newAuthorities.active.key_auths
    },
    posting: {
      ...account[0].posting,
      key_auths: newAuthorities.posting.key_auths
    },
    memo_key: newAuthorities.memo_key,
    json_metadata: account[0].json_metadata
  };
  return newAccountData;
};
const AccountUtils = {
  getAccount,
  getRecoveryAccount,
  getPrivateKeyFromSeed,
  generateNewSetOfKeys,
  accountUpdateBroadcast,
  createNewAuthoritiesFromKeys,
  getUpdatedAccountData,
  getAccountAvatarUrl
};
function RecoveryAccountAvatar({
  accountName
}) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  useEffect(() => {
    const fetchAvatarUrl = async () => {
      const avatarUrl2 = await AccountUtils.getAccountAvatarUrl(accountName);
      setAvatarUrl(avatarUrl2);
    };
    fetchAvatarUrl();
  }, [accountName]);
  if (avatarUrl) {
    return /* @__PURE__ */ jsx(
      Image,
      {
        src: avatarUrl,
        alt: "Avatar",
        roundedCircle: true,
        style: { width: 64, height: 64 }
      }
    );
  }
  return /* @__PURE__ */ jsx(Placeholder, { as: "div", animation: "glow", className: "d-inline-block mb-2", children: /* @__PURE__ */ jsx(
    Placeholder,
    {
      className: "rounded-circle",
      style: { width: 64, height: 64 }
    }
  ) });
}
function RecoveryAccountCard({
  recoveryAccount
}) {
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(Card.Header, { children: "Recovery Account" }),
    /* @__PURE__ */ jsx(Card.Body, { children: /* @__PURE__ */ jsxs("div", { className: "d-flex flex-column align-items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "d-flex align-items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          RecoveryAccountAvatar,
          {
            accountName: recoveryAccount.accountRecoveryName
          }
        ) }),
        /* @__PURE__ */ jsxs("h4", { className: "mb-0", children: [
          "@",
          recoveryAccount.accountRecoveryName
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 text-center w-100", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: recoveryAccount.recoveryLink,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "d-inline-block",
          children: recoveryAccount.description
        }
      ) })
    ] }) })
  ] });
}
function UsernameInput({
  onChangeCallback,
  onEnterCallback,
  value
}) {
  const [inputValue, setInputValue] = useState(value);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onEnterCallback) {
      onEnterCallback();
    }
  };
  return /* @__PURE__ */ jsx(
    Form.Control,
    {
      type: "text",
      placeholder: "Enter username",
      onChange: (e) => {
        setInputValue(e.target.value);
        onChangeCallback(e.target.value);
      },
      onKeyDown: handleKeyDown,
      value: inputValue
    }
  );
}
const Config = {
  spreadsheetUrl: "https://docs.google.com/spreadsheets/u/0/d/1hb0Al6w7jWtxcLDjivo7UjNYPJ_ne4IID7EkBVgT6Bo/htmlview"
};
const stripWrapper = (text) => {
  return text.replace(/^[^{]*|[^}]*$/g, "");
};
const extractedSheetIdFromHtmlview = (url) => {
  const m = url.match(/\/d\/([a-zA-Z0-9-_]+)\/htmlview/);
  return m ? m[1] : null;
};
const getRecoveryAccountByUsername = async (sheetId, username, gid = "0") => {
  var _a;
  const tq = encodeURIComponent(
    `select A,B,C where A='${username.replace(/'/g, "\\'")}' limit 1`
  );
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&tq=${tq}&gid=${gid}&_=${Date.now()}`;
  const res = await fetch(url, { cache: "no-store" });
  const txt = await res.text();
  const json = JSON.parse(stripWrapper(txt));
  const rows = ((_a = json.table) == null ? void 0 : _a.rows) ?? [];
  if (!rows.length) return void 0;
  const cells = rows[0].c.map((c2) => c2 ? c2.v : "");
  const [a, b, c] = cells;
  const row = {
    accountRecoveryName: String(a ?? ""),
    recoveryLink: String(b ?? ""),
    description: String(c ?? "")
  };
  return row.accountRecoveryName ? row : void 0;
};
const getRecoveryByRecoveryUsernameFromHtmlView = async (htmlViewUrl, username, gid = "0") => {
  const sheetId = extractedSheetIdFromHtmlview(htmlViewUrl);
  if (!sheetId)
    throw new Error("Could not extract SHEET_ID from htmlview URL.");
  return getRecoveryAccountByUsername(sheetId, username, gid);
};
const SpreadsheetUtils = {
  getRecoveryByRecoveryUsernameFromHtmlView
};
function meta({}) {
  return [{
    title: "Hive Account Recovery"
  }, {
    name: "description",
    content: "Hive Account Recovery"
  }];
}
const accountRecovery = UNSAFE_withComponentProps(function AccountRecovery() {
  const [usernameInput, setUsernameInput] = useState("");
  const [recoveryAccountUsername, setRecoveryAccountUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recoveryAccountData, setRecoveryAccountData] = useState(void 0);
  const getAccount2 = async (username) => {
    if (username === "") {
      return;
    }
    try {
      const recAccountUsername = await AccountUtils.getRecoveryAccount(username);
      setRecoveryAccountUsername(recAccountUsername);
      if (recAccountUsername && recAccountUsername !== "") {
        setIsLoading(true);
        SpreadsheetUtils.getRecoveryByRecoveryUsernameFromHtmlView(Config.spreadsheetUrl, recAccountUsername).then((row) => {
          if (row) {
            setRecoveryAccountData(row);
          } else {
            setRecoveryAccountData(void 0);
          }
        }).finally(() => {
          setIsLoading(false);
        });
      }
    } catch (error) {
      console.error(error);
      setRecoveryAccountData(void 0);
    }
  };
  const displayRecoveryAccountData = () => {
    if (recoveryAccountUsername === void 0) {
      return /* @__PURE__ */ jsx("p", {
        children: "You haven't set a recovery account"
      });
    } else if (recoveryAccountData === void 0 && recoveryAccountUsername) {
      return /* @__PURE__ */ jsxs("div", {
        className: "d-flex flex-column align-items-center",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "d-flex align-items-center gap-2",
          children: [/* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx(RecoveryAccountAvatar, {
              accountName: recoveryAccountUsername
            })
          }), /* @__PURE__ */ jsxs("h4", {
            className: "mb-0",
            children: ["@", recoveryAccountUsername]
          })]
        }), /* @__PURE__ */ jsxs("p", {
          children: ["Your recovery account is @", recoveryAccountUsername, ". Please contact them to try and recover you account."]
        })]
      });
    } else if (recoveryAccountData && recoveryAccountUsername) {
      return /* @__PURE__ */ jsx(RecoveryAccountCard, {
        recoveryAccount: recoveryAccountData
      });
    } else {
      return "";
    }
  };
  return /* @__PURE__ */ jsx("div", {
    className: "container mt-4 d-flex flex-column justify-content-center align-items-center",
    children: /* @__PURE__ */ jsxs(Card, {
      className: "w-100",
      style: {
        maxWidth: "500px"
      },
      children: [/* @__PURE__ */ jsxs(Card.Header, {
        children: [/* @__PURE__ */ jsx(Card.Title, {
          children: "Account Recovery"
        }), /* @__PURE__ */ jsx(Card.Text, {
          children: "Enter your username to search for your recovery account."
        })]
      }), /* @__PURE__ */ jsxs(Card.Body, {
        children: [/* @__PURE__ */ jsx("div", {
          className: "row justify-content-center",
          children: /* @__PURE__ */ jsxs(InputGroup, {
            className: "w-100",
            style: {
              maxWidth: "500px"
            },
            children: [/* @__PURE__ */ jsx(InputGroup.Text, {
              children: "@"
            }), /* @__PURE__ */ jsx(UsernameInput, {
              onChangeCallback: setUsernameInput,
              onEnterCallback: () => {
                getAccount2(usernameInput);
              },
              value: usernameInput
            }), /* @__PURE__ */ jsx(Button, {
              variant: "outline-secondary",
              onClick: () => {
                getAccount2(usernameInput);
              },
              children: "Search"
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "mt-3 ",
          children: isLoading ? /* @__PURE__ */ jsxs("div", {
            className: "d-flex flex-column align-items-center",
            children: [/* @__PURE__ */ jsx(Spinner, {}), /* @__PURE__ */ jsx("p", {
              children: "Fetching recovery account..."
            })]
          }) : /* @__PURE__ */ jsx(Fragment, {
            children: displayRecoveryAccountData()
          })
        })]
      })]
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: accountRecovery,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function KeyCard({
  name,
  masterPassword,
  privateKey,
  publicKey
}) {
  return /* @__PURE__ */ jsx(Card, { className: "mb-1", children: /* @__PURE__ */ jsxs(Card.Body, { children: [
    /* @__PURE__ */ jsx(Card.Title, { children: name }),
    masterPassword && /* @__PURE__ */ jsx(Card.Text, { className: "mb-1", children: masterPassword }),
    privateKey && /* @__PURE__ */ jsxs(Card.Text, { className: "mb-1", children: [
      /* @__PURE__ */ jsx("b", { children: "Private Key:" }),
      " ",
      privateKey
    ] }),
    publicKey && /* @__PURE__ */ jsxs(Card.Text, { className: "mb-1", children: [
      /* @__PURE__ */ jsx("b", { children: "Public Key:" }),
      " ",
      publicKey
    ] })
  ] }) });
}
function NewKeysCard({
  username,
  keys,
  copyKeysToClipboardClickedCallback
}) {
  const copyKeysToClipboard = () => {
    const keysString = JSON.stringify({ username, keys }, null, 2);
    navigator.clipboard.writeText(keysString);
    copyKeysToClipboardClickedCallback();
  };
  return /* @__PURE__ */ jsx(Card, { className: "w-100", style: { maxWidth: "700px" }, children: /* @__PURE__ */ jsxs(Card.Body, { children: [
    /* @__PURE__ */ jsx(Card.Title, { children: "New Keys" }),
    keys.map((key, index) => /* @__PURE__ */ jsx(KeyCard, { ...key }, index)),
    /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx("div", { className: "d-flex justify-content-end", children: /* @__PURE__ */ jsx(
      Button$1,
      {
        variant: "outline-secondary",
        onClick: () => {
          copyKeysToClipboard();
        },
        children: "Copy Keys to Clipboard"
      }
    ) }) })
  ] }) });
}
function CheckBox({
  label,
  checked,
  onChange
}) {
  return /* @__PURE__ */ jsx("div", { className: "form-check", children: /* @__PURE__ */ jsx(
    Form.Check,
    {
      id: label,
      type: "checkbox",
      checked,
      onChange: (e) => onChange(e.target.checked),
      label
    }
  ) });
}
const AuthListGroup = ({ type, authority }) => {
  const auths = type === "account" ? authority.account_auths : authority.key_auths;
  return /* @__PURE__ */ jsxs(ListGroup, { className: "my-2", children: [
    /* @__PURE__ */ jsx(ListGroup.Item, { variant: "secondary", children: /* @__PURE__ */ jsxs(Row, { children: [
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("strong", { children: type === "account" ? "Account" : "Key" }) }),
      /* @__PURE__ */ jsx(Col, { className: "text-end", children: /* @__PURE__ */ jsx("strong", { children: "Weight" }) })
    ] }) }),
    auths.map(([account, weight], index) => /* @__PURE__ */ jsx(ListGroup.Item, { children: /* @__PURE__ */ jsxs(Row, { children: [
      /* @__PURE__ */ jsx(Col, { children: type === "account" ? `@${account}` : account.toString() }),
      /* @__PURE__ */ jsx(Col, { className: "text-end", children: weight })
    ] }) }, index)),
    /* @__PURE__ */ jsx(ListGroup.Item, { variant: "light", children: /* @__PURE__ */ jsxs(Row, { children: [
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx("strong", { children: "Weight Threshold" }) }),
      /* @__PURE__ */ jsx(Col, { className: "text-end", children: authority.weight_threshold })
    ] }) }, type + " threshold")
  ] });
};
const AuthorityCard = ({
  name,
  authority,
  memoKey
}) => {
  return /* @__PURE__ */ jsxs(Card, { className: "mb-2", children: [
    /* @__PURE__ */ jsx(Card.Header, { children: /* @__PURE__ */ jsx(Card.Title, { children: name }) }),
    /* @__PURE__ */ jsxs(Card.Body, { children: [
      authority && authority.account_auths.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Card.Title, { children: "Accounts" }),
        /* @__PURE__ */ jsx(AuthListGroup, { type: "account", authority })
      ] }),
      authority && authority.key_auths.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Card.Title, { children: "Keys" }),
        /* @__PURE__ */ jsx(AuthListGroup, { type: "key", authority })
      ] }),
      memoKey && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Card.Text, { children: memoKey.toString() }) })
    ] })
  ] });
};
const KeyInput = ({
  label,
  value,
  onChange
}) => {
  return /* @__PURE__ */ jsxs(InputGroup, { children: [
    /* @__PURE__ */ jsx(InputGroup.Text, { children: label }),
    /* @__PURE__ */ jsx(
      Form.Control,
      {
        type: "text",
        value,
        onChange: (e) => onChange(e.target.value)
      }
    )
  ] });
};
function BroadcastUpdateModal({
  updatedAccountData,
  onCancel,
  show
}) {
  const [ownerKey, setOwnerKey] = useState("");
  const [result, setResult] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleBroadcastUpdate = async () => {
    const result2 = await AccountUtils.accountUpdateBroadcast(
      updatedAccountData,
      ownerKey
    );
    setResult(result2);
  };
  useEffect(() => {
    if (result && result.id.length > 0) {
      setIsSuccess(true);
    }
  }, [result]);
  return /* @__PURE__ */ jsxs(Modal, { show, onHide: onCancel, children: [
    /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: "Broadcast Update" }) }),
    /* @__PURE__ */ jsxs(Modal.Body, { children: [
      /* @__PURE__ */ jsx("p", { children: "Enter your owner key:" }),
      /* @__PURE__ */ jsx(KeyInput, { label: "Owner Key", value: ownerKey, onChange: setOwnerKey }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 d-flex justify-content-end", children: /* @__PURE__ */ jsx(Button, { variant: "outline-primary", onClick: handleBroadcastUpdate, children: "Broadcast Update" }) }),
      isSuccess && /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
        /* @__PURE__ */ jsx("p", { children: "Transaction Broadcasted Successfully!" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Transaction ID: ",
          result.id
        ] }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(
          "a",
          {
            href: `https://hivehub.dev/tx/${result.id}`,
            target: "_blank",
            rel: "noopener noreferrer",
            children: "View on HiveHub"
          }
        ) })
      ] })
    ] })
  ] });
}
function AccountUpdateModal({
  username,
  updatedAccountData,
  show,
  onCancel,
  onUpdate
}) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Modal, { size: "lg", centered: true, show, onHide: onCancel, children: [
    /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: "Account Update" }) }),
    /* @__PURE__ */ jsx(Modal.Body, { children: updatedAccountData ? /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Are you sure you want to update the account ",
        /* @__PURE__ */ jsxs("b", { children: [
          "@",
          username
        ] }),
        " ",
        "with the following authorities?"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          AuthorityCard,
          {
            name: "Owner",
            authority: updatedAccountData.owner
          }
        ),
        /* @__PURE__ */ jsx(
          AuthorityCard,
          {
            name: "Active",
            authority: updatedAccountData.active
          }
        ),
        /* @__PURE__ */ jsx(
          AuthorityCard,
          {
            name: "Posting",
            authority: updatedAccountData.posting
          }
        ),
        /* @__PURE__ */ jsx(
          AuthorityCard,
          {
            name: "Memo Key",
            memoKey: updatedAccountData.memo_key
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-center align-items-center", children: [
      /* @__PURE__ */ jsx(Spinner, {}),
      /* @__PURE__ */ jsx("p", { children: "Fetching account data..." })
    ] }) }),
    /* @__PURE__ */ jsxs(Modal.Footer, { children: [
      /* @__PURE__ */ jsx(Button$1, { variant: "outline-secondary", onClick: onCancel, children: "Cancel" }),
      /* @__PURE__ */ jsx(Button$1, { variant: "outline-primary", onClick: onUpdate, children: "Update" })
    ] })
  ] }) });
}
const changeKeys = UNSAFE_withComponentProps(function ChangeKeys() {
  const [keysCopied, setKeysCopied] = useState(false);
  const [copyKeysToClipboard, setCopyKeysToClipboard] = useState(false);
  const [understandKeysOutsideKeychain, setUnderstandKeysOutsideKeychain] = useState(false);
  const [newKeys, setNewKeys] = useState(void 0);
  const [usernameInput, setUsernameInput] = useState("");
  const [showAccountUpdateModal, setShowAccountUpdateModal] = useState(false);
  const [showBroadcastUpdateModal, setShowBroadcastUpdateModal] = useState(false);
  const [updatedAccountData, setUpdatedAccountData] = useState(null);
  const generateKeys = async (username) => {
    setUnderstandKeysOutsideKeychain(false);
    setCopyKeysToClipboard(false);
    setKeysCopied(false);
    const {
      masterPassword,
      ownerPrivateKey,
      activePrivateKey,
      postingPrivateKey,
      memoPrivateKey
    } = AccountUtils.generateNewSetOfKeys(username);
    const keys = {
      masterPassword,
      ownerPrivateKey,
      activePrivateKey,
      postingPrivateKey,
      memoPrivateKey
    };
    setNewKeys(keys);
  };
  const crossCheckIfCopyKeysToClipboard = () => {
    if (!keysCopied) {
      alert("Please copy the keys to clipboard first.");
      return false;
    }
    return true;
  };
  const handleNext = () => {
    if (newKeys) {
      const newAuthorities = AccountUtils.createNewAuthoritiesFromKeys(usernameInput, newKeys);
      AccountUtils.getUpdatedAccountData(usernameInput, newAuthorities).then((data) => {
        setUpdatedAccountData(data);
      });
      setShowAccountUpdateModal(true);
    }
  };
  const handleUpdate = () => {
    if (updatedAccountData) {
      setShowAccountUpdateModal(false);
      setShowBroadcastUpdateModal(true);
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "container mt-4 d-flex flex-column justify-content-center align-items-center",
    children: [/* @__PURE__ */ jsxs(Card, {
      className: "w-100",
      style: {
        maxWidth: "700px"
      },
      children: [/* @__PURE__ */ jsxs(Card.Header, {
        children: [/* @__PURE__ */ jsx(Card.Title, {
          children: "Change Keys"
        }), /* @__PURE__ */ jsx(Card.Text, {
          children: "Enter your username to generate new keys."
        })]
      }), /* @__PURE__ */ jsxs(Card.Body, {
        children: [/* @__PURE__ */ jsx("div", {
          className: "row justify-content-center",
          children: /* @__PURE__ */ jsxs(InputGroup, {
            className: "w-100",
            style: {
              maxWidth: "500px"
            },
            children: [/* @__PURE__ */ jsx(InputGroup.Text, {
              children: "@"
            }), /* @__PURE__ */ jsx(UsernameInput, {
              onChangeCallback: setUsernameInput,
              onEnterCallback: () => generateKeys(usernameInput),
              value: usernameInput
            }), /* @__PURE__ */ jsx(Button, {
              variant: "outline-secondary",
              onClick: () => {
                generateKeys(usernameInput);
              },
              children: "Generate Keys"
            })]
          })
        }), newKeys && /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("div", {
            className: "mt-3",
            children: /* @__PURE__ */ jsx(NewKeysCard, {
              username: usernameInput,
              keys: [{
                name: "Master Password",
                masterPassword: newKeys == null ? void 0 : newKeys.masterPassword.toString(),
                privateKey: void 0,
                publicKey: void 0
              }, ...["Owner", "Active", "Posting", "Memo"].map((role) => {
                var _a, _b;
                const keyName = role.toLowerCase() + "PrivateKey";
                return {
                  name: role,
                  masterPassword: void 0,
                  privateKey: (_a = newKeys == null ? void 0 : newKeys[keyName]) == null ? void 0 : _a.toString(),
                  publicKey: (_b = newKeys == null ? void 0 : newKeys[keyName]) == null ? void 0 : _b.createPublic().toString()
                };
              })],
              copyKeysToClipboardClickedCallback: () => setKeysCopied(true)
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-3",
            children: [/* @__PURE__ */ jsx(CheckBox, {
              label: "I have safely copied the keys and saved them outside of Keychain",
              checked: copyKeysToClipboard,
              onChange: (checked) => {
                if (checked) {
                  if (crossCheckIfCopyKeysToClipboard()) {
                    setCopyKeysToClipboard(checked);
                  }
                }
              }
            }), /* @__PURE__ */ jsx(CheckBox, {
              label: "I understand that Keychain should not be considered as the primary place of storage for my keys",
              checked: understandKeysOutsideKeychain,
              onChange: (checked) => setUnderstandKeysOutsideKeychain(checked)
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-1 d-flex justify-content-end",
            children: /* @__PURE__ */ jsx(Button, {
              variant: understandKeysOutsideKeychain && copyKeysToClipboard ? "outline-primary" : "outline-secondary",
              onClick: () => {
                handleNext();
              },
              disabled: !(understandKeysOutsideKeychain && copyKeysToClipboard),
              children: "Next"
            })
          })]
        })]
      })]
    }), showAccountUpdateModal && newKeys && updatedAccountData && /* @__PURE__ */ jsx(AccountUpdateModal, {
      username: usernameInput,
      updatedAccountData,
      show: showAccountUpdateModal,
      onCancel: () => {
        setShowAccountUpdateModal(false);
        setShowBroadcastUpdateModal(false);
      },
      onUpdate: () => {
        handleUpdate();
      }
    }), showBroadcastUpdateModal && updatedAccountData && /* @__PURE__ */ jsx(BroadcastUpdateModal, {
      updatedAccountData,
      onCancel: () => setShowBroadcastUpdateModal(false),
      show: showBroadcastUpdateModal
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: changeKeys
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BkjiBLA0.js", "imports": ["/assets/chunk-ZYFC6VSF-B3aerHc2.js", "/assets/index-CG_zdRRE.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-CktfH22Z.js", "imports": ["/assets/chunk-ZYFC6VSF-B3aerHc2.js", "/assets/index-CG_zdRRE.js", "/assets/CardHeaderContext-08KsEWZb.js", "/assets/AbstractModalHeader-B3hls52t.js"], "css": ["/assets/root-BqVuWbeq.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/account-recovery": { "id": "routes/account-recovery", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/account-recovery-WuLz04GC.js", "imports": ["/assets/chunk-ZYFC6VSF-B3aerHc2.js", "/assets/username-input-Cua_Ov2M.js", "/assets/CardHeaderContext-08KsEWZb.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/change-keys": { "id": "routes/change-keys", "parentId": "root", "path": "change-keys", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/change-keys-D-tsO7So.js", "imports": ["/assets/chunk-ZYFC6VSF-B3aerHc2.js", "/assets/username-input-Cua_Ov2M.js", "/assets/CardHeaderContext-08KsEWZb.js", "/assets/AbstractModalHeader-B3hls52t.js", "/assets/index-CG_zdRRE.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-a0af5530.js", "version": "a0af5530", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/account-recovery": {
    id: "routes/account-recovery",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/change-keys": {
    id: "routes/change-keys",
    parentId: "root",
    path: "change-keys",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
