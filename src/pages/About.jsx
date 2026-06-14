import React from "react";

export default function ApiTestingOverview() {
  return (
    <>
      <style>{`
        .api-overview {
          width: 100%;
          padding: 80px 20px;
          background: #0f172a;
          font-family: Inter, sans-serif;
        }

        .api-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .api-card {
          background: #111827;
          border: 1px solid #1e293b;
          border-radius: 24px;
          padding: 50px;
          box-shadow: 0 20px 40px rgba(0,0,0,.35);
        }

        .api-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 16px;
        }

        .api-subtitle {
          text-align: center;
          color: #94a3b8;
          margin-bottom: 40px;
          font-size: 1.05rem;
        }

        .api-content {
          color: #cbd5e1;
          line-height: 1.9;
          font-size: 1.05rem;
        }

        .api-content p {
          margin-bottom: 18px;
        }

        .highlight {
          color: #38bdf8;
          font-weight: 600;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 40px;
        }

        .feature-card {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 16px;
          padding: 24px;
          transition: all .25s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: #38bdf8;
          box-shadow: 0 12px 30px rgba(56,189,248,.15);
        }

        .feature-card h3 {
          color: #38bdf8;
          margin-bottom: 12px;
          font-size: 1.1rem;
        }

        .feature-card p {
          margin: 0;
          color: #cbd5e1;
          line-height: 1.6;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-box {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 16px;
          padding: 24px;
          text-align: center;
        }

        .stat-box h2 {
          color: #38bdf8;
          font-size: 2rem;
          margin: 0;
        }

        .stat-box span {
          color: #94a3b8;
          font-size: .9rem;
        }

        @media (max-width: 768px) {

          .api-card {
            padding: 30px;
          }

          .api-title {
            font-size: 2rem;
          }

          .stats-row {
            grid-template-columns: 1fr;
          }

          .feature-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="api-overview">
        <div className="api-container">

          <div className="stats-row">
            <div className="stat-box">
              <h2>100%</h2>
              <span>Automated Validation</span>
            </div>

            <div className="stat-box">
              <h2>∞</h2>
              <span>Multiple Test Cases</span>
            </div>

            <div className="stat-box">
              <h2>⚡</h2>
              <span>Parallel Execution</span>
            </div>
          </div>

          <div className="api-card">

            <h2 className="api-title">
              Smarter API Testing & Validation
            </h2>

            <p className="api-subtitle">
              Execute, validate and compare multiple API test cases automatically.
            </p>

            <div className="api-content">
              <p>
                Traditional tools like <span className="highlight">Postman</span>
                {" "}require developers to manually inspect JSON responses and
                verify whether the returned data matches the expected output.
                This process becomes repetitive and time-consuming when testing
                multiple APIs and different request scenarios.
              </p>

              <p>
                Our platform automatically compares
                <span className="highlight"> expected JSON responses </span>
                with
                <span className="highlight"> actual API responses </span>
                and instantly highlights mismatches, eliminating manual
                verification and reducing testing effort.
              </p>

              <p>
                Unlike conventional testing tools, this solution supports
                <span className="highlight">
                  {" "}multiple APIs, multiple JSON requests, and multiple test cases
                </span>
                {" "}running simultaneously, enabling faster regression testing,
                improved reliability, and higher productivity.
              </p>
            </div>

            <div className="feature-grid">

              <div className="feature-card">
                <h3>⚡ Automated Validation</h3>
                <p>
                  Automatically compare expected and actual responses without
                  manual inspection.
                </p>
              </div>

              <div className="feature-card">
                <h3>🚀 Parallel Testing</h3>
                <p>
                  Execute multiple APIs and test cases simultaneously for
                  faster validation.
                </p>
              </div>

              <div className="feature-card">
                <h3>🎯 Accurate Results</h3>
                <p>
                  Instantly detect mismatches and identify failed test cases.
                </p>
              </div>

              <div className="feature-card">
                <h3>📈 Increased Productivity</h3>
                <p>
                  Reduce repetitive work and accelerate development cycles.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}