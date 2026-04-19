import { isRouteErrorResponse, useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div style={{ padding: "0px 20px" }}>
        <h1>Error</h1>
        <p
          style={{
            textDecoration: "underline dotted #000",
          }}
        >
          {error.message}
        </p>
        <p>The stack trace is:</p>
        <pre
          style={{
            padding: "10px 10px",
            backgroundColor: "rgba(255, 0, 0, 0.199)",
          }}
        >
          {error.stack}
        </pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
