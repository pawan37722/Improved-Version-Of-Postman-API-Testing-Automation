export default function About() {
  return (
    <div className="content-page">
      <h1>About ApiTesting</h1>
      <p>
        ApiTesting is a lightweight, browser-based tool for sending requests
        to any HTTP API and comparing the response against an expected
        result. It is a single-page app built with React 18, React Router 7
        and Vite, and it runs entirely in the browser — no backend required.
      </p>

      <h2>Why it exists</h2>
      <p>
        Manually testing endpoints with curl or Postman works, but it is easy
        to lose track of what was tried and what the expected result should
        be. ApiTesting keeps each request, its headers, its body and its
        expected response side by side, and runs everything from the browser.
      </p>

      <h2>Tech stack</h2>
      <ul>
        <li>React 18 + Vite</li>
        <li>React Router 7 for client-side navigation</li>
        <li>Vercel for static hosting</li>
      </ul>
    </div>
  );
}
