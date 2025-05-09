'use client' // Error boundaries must be Client Components
 
export default function GlobalError({
  reset
}: {
  reset: () => void
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
        <button onClick={() => window.location.href = '/'}>Return to home</button>
      </body>
    </html>
  )
}