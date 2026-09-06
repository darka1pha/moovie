'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#0d0c11", color: "#ffffff", fontFamily: "sans-serif", margin: 0, padding: 0 }}>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px" }}>Application Error</h1>
          <p style={{ color: "#848485", maxWidth: "420px", marginBottom: "24px", lineHeight: 1.6 }}>
            A critical error occurred while rendering the application.
          </p>
          <button
            type="button"
            aria-label="Try again"
            onClick={() => reset()}
            style={{
              backgroundColor: "#efae28",
              color: "#000000",
              fontWeight: 600,
              padding: "12px 24px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}