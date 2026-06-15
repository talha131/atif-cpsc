// Serve every request as the "Coming Soon" page, but with an HTTP 503
// (Service Unavailable) status and a Retry-After header.
//
// Why 503 instead of a 200, a redirect, or a 404:
// Google treats 503 as "this site is temporarily down" and KEEPS the
// existing URLs (homepage, about, admission, apply, contact) in its index
// instead of dropping them (404) or merging them away (301). That holds
// our accumulated rankings and link equity in place until the real site
// comes back. A plain 200 "Coming Soon" page would risk Google re-indexing
// every URL as thin/empty content and tanking those rankings.
// Ref: Google Search Central — handling site downtime / temporary unavailability.
//
// Retry-After tells crawlers roughly when to check back. One week keeps
// Google re-crawling periodically without treating the outage as permanent.
// Normal visitors never see the status code — browsers render the body as usual.

const RETRY_AFTER_SECONDS = 60 * 60 * 24 * 7; // 7 days

const PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Coming Soon</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: "Arial", sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #3f51b5, #2196f3);
      color: white;
      text-align: center;
    }
    .container {
      max-width: 500px;
      padding: 20px;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: 10px;
    }
    p {
      font-size: 1.2rem;
      opacity: 0.9;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Coming Soon</h1>
    <p>We’re working hard to launch something amazing. Stay tuned!</p>
  </div>
</body>
</html>
`;

export default () =>
  new Response(PAGE, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "retry-after": String(RETRY_AFTER_SECONDS),
      // Don't let CDNs or browsers cache the "down" state for long, so the
      // site flips back the moment the real content is restored.
      "cache-control": "no-store, max-age=0",
    },
  });
