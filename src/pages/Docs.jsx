import React from "react";

const sections = [
  {
    id: "item1",
    number: 1,
    title: "Run All",
    description:
      "Executes every test case available in the windows."
  },
  {
    id: "item2",
    number: 2,
    title: "Add Test Case",
    description:
      "Creates a new API test case."
  },
  {
    id: "item3",
    number: 3,
    title: "run test case",
    description:
      "checks for sigle test case execution.",
  },
  {
    id: "item4",
    number: 4,
    title: "URL Input",
    description:
      "The API endpoint that receives the request.",
    code: `https://jsonplaceholder.typicode.com/todos/1`
  },
  {
    id: "item5",
    number: 5,
    title: "Data Input",
    description:
      "JSON payload used in POST, PUT and PATCH requests.",
    code: `{
  "key":"value"
}`
  },
  {
    id: "item6",
    number: 6,
    title: "Request Configuration Area",
    description:
      "Contains method, headers, body and request options."
  },
  {
    id: "item7",
    number: 7,
    title: "HTTP Method",
    description:
      "GET, POST, PUT, PATCH and DELETE.",
    code: `method: "GET"`
  },
  {
    id: "item8",
    number: 8,
    title: "Headers",
    description:
      "Additional information sent with the request.",
    code: `{
  "Content-Type":"application/json",
  "Authorization":"Bearer token"
}`
  },
  {
    id: "item9",
    number: 9,
    title: "Fix Data",
    description:
      "Formats and validates request data."
  },
  {
    id: "item10",
    number: 10,
    title: "Run",
    description:
      "Runs the selected test case."
  },
  {
    id: "item11",
    number: 11,
    title: "Hide / Show Panel",
    description:
      "Collapses or expands request and response sections."
  },
  {
    id: "item12",
    number: 12,
    title: "Expected Output",
    description:
      "JSON response expected from the API.",
    code: `{
  "userId":1,
  "id":1,
  "title":"delectus aut autem",
  "completed":false
}`
  },
  {
    id: "item13",
    number: 13,
    title: "Actual Output",
    description:
      "Real response returned after execution.",
    code: `{
  "userId":1,
  "id":1,
  "title":"delectus aut autem",
  "completed":false
}`
  }
];

export default function ApiTesterDocumentation() {
  return (
    <>
      <style>{`
        html{
          scroll-behavior:smooth;
        }

        .doc-container{
          width:100%;
          max-width:1800px;
          margin:auto;
          padding:24px;
          background:#f8fafc;
          min-height:100vh;
          font-family:Inter, sans-serif;
        }

        .doc-title{
          text-align:center;
          margin-bottom:24px;
        }

        .doc-title h1{
          font-size:42px;
          margin-bottom:10px;
        }

        .doc-title p{
          color:#64748b;
        }

        .hero-image{
          width:100%;
          border-radius:16px;
          display:block;
          border:1px solid #e2e8f0;
          box-shadow:0 8px 30px rgba(0,0,0,.08);
        }

        .anchor-nav{
          display:flex;
          flex-wrap:wrap;
          gap:10px;
          justify-content:center;
          margin:24px 0;
          padding:16px;
          background:white;
          border-radius:14px;
          position:sticky;
          top:10px;
          z-index:100;
          box-shadow:0 4px 16px rgba(0,0,0,.08);
        }

        .anchor-nav a{
          text-decoration:none;
          color:white;
          background:#0f172a;
          padding:10px 16px;
          border-radius:999px;
          transition:.25s;
          font-size:14px;
        }

        .anchor-nav a:hover{
          background:#0891b2;
          transform:translateY(-2px);
        }

        .cards-grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(400px,1fr));
          gap:20px;
        }

        .card{
          background:white;
          border-radius:16px;
          padding:24px;
          border:1px solid #e2e8f0;
          box-shadow:0 4px 16px rgba(0,0,0,.05);
        }

        .card-header{
          display:flex;
          align-items:center;
          gap:12px;
          margin-bottom:16px;
        }

        .badge{
          width:40px;
          height:40px;
          border-radius:50%;
          background:#0891b2;
          color:white;
          display:flex;
          align-items:center;
          justify-content:center;
          font-weight:700;
        }

        .card h2{
          margin:0;
          font-size:22px;
          color:#0891b2;
        }

        .card p{
          color:#334155;
          line-height:1.7;
        }

        .code-block{
          margin-top:16px;
          background:#0f172a;
          color:#e2e8f0;
          padding:16px;
          border-radius:10px;
          overflow:auto;
          font-family:Consolas, monospace;
          white-space:pre-wrap;
        }

        @media(max-width:768px){
          .cards-grid{
            grid-template-columns:1fr;
          }

          .doc-title h1{
            font-size:30px;
          }
        }
      `}</style>

      <div className="doc-container">

        <div className="doc-title">
          <h1 style={{ color: "red" }}>API Testing Tool Documentation</h1>
          <p>Complete explanation of all inputs, outputs and controls.</p>
        </div>
        <img
          src="https://drive.google.com/thumbnail?id=18IdDOMvAZG6RVBoUcwVxgyMb_V7aPHC_&sz=w2000"
          alt="API Testing Tool"
          className="hero-image"
        />

        <nav className="anchor-nav">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.number}. {section.title}
            </a>
          ))}
        </nav>

        <div className="cards-grid">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="card">
              <div className="card-header">
                <div className="badge">{section.number}</div>
                <h2>{section.title}</h2>
              </div>

              <p>{section.description}</p>

              {section.code && (
                <pre className="code-block">
                  {section.code}
                </pre>
              )}
            </div>
          ))}
        </div>

      </div>
    </>
  );
}