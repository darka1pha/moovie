'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body>
        <p>Something went wrong!</p>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}