import { useState, useRef } from 'react';

const DEFAULT_URL = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}/api`
  : 'http://localhost:3000/api';

let _id = 1;
const uid = () => _id++;

function makeCase(from = null) {
  if (from) {
    return {
      ...from,
      id:       uid(),
      name:     `Case ${_id - 1}`,
      output:   null,
      status:   'idle',
      duration: null,
    };
  }
  return {
    id:       uid(),
    name:     `Case ${_id - 1}`,
    url:      DEFAULT_URL,
    method:   'POST',
    bodyText: `"id": "a1b2c3",\n"name": "xyz"`,
    headers:  `"Authorization": "Bearer token"`,
    expected: `{\n  "status": "success",\n  "error": "no error"\n}`,
    output:   null,
    status:   'idle',
    duration: null,
  };
}

function sortedStringify(val) {
  if (val === null || typeof val !== 'object') return JSON.stringify(val);
  if (Array.isArray(val)) return '[' + val.map(sortedStringify).join(',') + ']';
  const keys = Object.keys(val).sort();
  return '{' + keys.map(k => JSON.stringify(k) + ':' + sortedStringify(val[k])).join(',') + '}';
}

function jsonEqual(a, b) {
  try {
    return sortedStringify(JSON.parse(a.trim())) === sortedStringify(JSON.parse(b.trim()));
  } catch {
    return a.trim() === b.trim();
  }
}

function Badge({ status, duration }) {
  const cfg = {
    idle:    { label: 'IDLE',    cls: 'badge-idle' },
    running: { label: 'RUNNING', cls: 'badge-running' },
    pass:    { label: 'PASS',    cls: 'badge-pass' },
    fail:    { label: 'FAIL',    cls: 'badge-fail' },
    error:   { label: 'ERROR',   cls: 'badge-error' },
  }[status] || { label: 'IDLE', cls: 'badge-idle' };
  return (
    <span className={`badge ${cfg.cls}`}>
      {status === 'running' && <span className="spin" />}
      {cfg.label}
      {duration != null && status !== 'running' && (
        <span className="badge-ms">{duration}ms</span>
      )}
    </span>
  );
}

function InlineField({ value, onChange, placeholder, rows = 1, wide }) {
  return (
    <textarea
      className={`inline-field${wide ? ' wide' : ''}`}
      value={value}
      rows={rows}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      spellCheck={false}
    />
  );
}

// Hardcoded (red, non-editable) token
function HC({ children }) {
  return <span className="ft-hc">{children}</span>;
}

function CaseCard({ tc, onChange, onRemove, onRun, total }) {
  const running = tc.status === 'running';
  const set = field => val => onChange(tc.id, field, val);

  const outLines = tc.output ? tc.output.split('\n') : [];
  const expLines = tc.expected ? tc.expected.split('\n') : [];
  const diffLines =
    tc.status === 'pass'
      ? outLines.map(line => ({ line, ok: true }))
      : tc.status === 'fail'
      ? outLines.map((line, i) => ({ line, ok: line === (expLines[i] ?? '') }))
      : null;

  return (
    <div className={`case-card case-${tc.status}`}>

      {/* TOP BAR */}
      <div className="case-topbar">
        <div className="case-left">
          <input
            className="case-name"
            value={tc.name}
            onChange={e => onChange(tc.id, 'name', e.target.value)}
            spellCheck={false}
          />
          <Badge status={tc.status} duration={tc.duration} />
        </div>
        <div className="case-right">
          <button className="btn-run" onClick={() => onRun(tc.id)} disabled={running}>
            {running ? <><span className="spin" /> Running…</> : '▶ Run'}
          </button>
          {total > 1 && (
            <button className="btn-rm" onClick={() => onRemove(tc.id)}>✕ Delete</button>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="case-body">

        {/* LEFT — fetch template */}
        <div className="pane pane-code">
          <div className="pane-label"><span className="dot dot-blue" />Request</div>

          <div className="fetch-template">

            {/* const url = '___'; */}
            <div className="ft-line">
              <HC>const</HC><span className="ft-var"> url </span><HC>= '</HC>
              <InlineField value={tc.url} onChange={set('url')} wide placeholder="https://api.example.com/data" />
              <HC>';</HC>
            </div>

            {/* const data = { ___ }; */}
            <div className="ft-line ft-mt">
              <HC>const</HC><span className="ft-var"> data </span><HC>= {'{'}</HC>
            </div>
            <div className="ft-block">
              <InlineField
                value={tc.bodyText}
                onChange={set('bodyText')}
                wide rows={3}
                placeholder={`"id": "a1b2c3",\n"name": "xyz"`}
              />
            </div>
            <div className="ft-line"><HC>{'};'}</HC></div>

            {/* fetch(url, { */}
            <div className="ft-line ft-mt">
              <HC>fetch(url, {'{'}</HC>
            </div>

            {/* method */}
            <div className="ft-line ft-i1">
              <HC>method: '</HC>
              <InlineField value={tc.method} onChange={set('method')} placeholder="POST" />
              <HC>',</HC>
            </div>

            {/* headers */}
            <div className="ft-line ft-i1"><HC>headers: {'{'}</HC></div>
            <div className="ft-line ft-i2">
              <span className="ft-hc-dim">'Content-Type': 'application/json',</span>
            </div>
            <div className="ft-block ft-i2">
              <InlineField
                value={tc.headers}
                onChange={set('headers')}
                wide rows={2}
                placeholder={`"Authorization": "Bearer token"`}
              />
            </div>
            <div className="ft-line ft-i1"><HC>{'}'} ,</HC></div>

            {/* body — hardcoded red */}
            <div className="ft-line ft-i1">
              <HC>body: JSON.stringify(data)</HC>
            </div>

            <div className="ft-line"><HC>{'});'}</HC></div>
          </div>
        </div>

        {/* RIGHT — expected + output */}
        <div className="pane pane-right">
          <div className="pane-section">
            <div className="pane-label"><span className="dot dot-yellow" />Expected Output</div>
            <textarea
              className="code-box expected-box"
              value={tc.expected}
              onChange={e => onChange(tc.id, 'expected', e.target.value)}
              spellCheck={false}
            />
          </div>

          <div className="pane-section">
            <div className="pane-label"><span className="dot dot-green" />Actual Output</div>
            <div className={`output-box output-${tc.status}`}>
              {tc.output == null && <span className="out-ph">Run to see output…</span>}
              {tc.output != null && diffLines && (
                <pre className="out-pre">
                  {diffLines.map((d, i) => (
                    <div key={i} className={d.ok ? 'dl-ok' : 'dl-bad'}>{d.line}</div>
                  ))}
                </pre>
              )}
              {tc.output != null && !diffLines && <pre className="out-pre">{tc.output}</pre>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────
export default function App() {
  const [cases, setCases]       = useState([makeCase()]);
  const [activeId, setActiveId] = useState(null); // null = use first

  const activeCaseId = activeId ?? cases[0]?.id;
  const activeCase   = cases.find(c => c.id === activeCaseId) ?? cases[0];

  function addCase() {
    const newC = makeCase(cases[cases.length - 1]);
    setCases(prev => [...prev, newC]);
    setActiveId(newC.id);
  }

  function removeCase(id) {
    setCases(prev => {
      const next = prev.filter(c => c.id !== id);
      if (activeId === id) setActiveId(next[next.length - 1]?.id ?? null);
      return next;
    });
  }

  function updateCase(id, field, val) {
    setCases(prev => prev.map(c => c.id === id ? { ...c, [field]: val } : c));
  }

  async function runCase(id) {
    const tc = cases.find(c => c.id === id);
    if (!tc) return;

    setCases(prev => prev.map(c =>
      c.id === id ? { ...c, status: 'running', output: null, duration: null } : c
    ));

    const start = Date.now();
    try {
      const bodyObj = JSON.parse('{' + tc.bodyText + '}');
      let extraHeaders = {};
      try { extraHeaders = JSON.parse('{' + tc.headers + '}'); } catch { /**/ }

      const res = await fetch(tc.url, {
        method: tc.method.trim().toUpperCase(),
        headers: { 'Content-Type': 'application/json', ...extraHeaders },
        body: ['GET', 'HEAD'].includes(tc.method.trim().toUpperCase())
          ? undefined
          : JSON.stringify(bodyObj),
      });

      const data   = await res.json();
      const output = JSON.stringify(data, null, 2);
      const dur    = Date.now() - start;
      const passed = jsonEqual(output, tc.expected);

      setCases(prev => prev.map(c =>
        c.id === id ? { ...c, status: passed ? 'pass' : 'fail', output, duration: dur } : c
      ));
    } catch (err) {
      setCases(prev => prev.map(c =>
        c.id === id
          ? { ...c, status: 'error', output: `Error: ${err.message}`, duration: Date.now() - start }
          : c
      ));
    }
  }

  async function runAll() {
    for (const c of cases) await runCase(c.id);
  }

  const counts = cases.reduce(
    (a, c) => {
      if (c.status === 'pass') a.pass++;
      else if (c.status === 'fail') a.fail++;
      else if (c.status === 'error') a.err++;
      return a;
    },
    { pass: 0, fail: 0, err: 0 }
  );

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="hdr-left">
          <span className="logo-icon">⟨/⟩</span>
          <span className="logo-text">Api<b>Testing</b></span>
          <span className="logo-sep">|</span>
          <span className="logo-sub">JS API Test Runner</span>
        </div>
        <div className="hdr-right">
          <div className="stats">
            <span className="s-pass">✓ {counts.pass} Passed</span>
            <span className="s-fail">✗ {counts.fail} Failed</span>
            <span className="s-err">⚠ {counts.err} Error</span>
          </div>
          <button className="btn-run-all" onClick={runAll}>▶ Run All</button>
          <button className="btn-add" onClick={addCase}>+ Add Case</button>
        </div>
      </header>

      {/* TABS — clicking switches active case */}
      <div className="tabs-bar">
        {cases.map(c => (
          <div
            key={c.id}
            className={`tab tab-${c.status}${c.id === activeCaseId ? ' tab-active' : ''}`}
            onClick={() => setActiveId(c.id)}
          >
            {c.status === 'pass'    && <span className="td-pass">✓</span>}
            {c.status === 'fail'    && <span className="td-fail">✗</span>}
            {c.status === 'error'   && <span className="td-err">⚠</span>}
            {(c.status === 'idle' || c.status === 'running') && <span className="td-idle">○</span>}
            {c.name}
          </div>
        ))}
      </div>

      {/* MAIN — only active case shown */}
      <main className="main">
        {activeCase && (
          <CaseCard
            key={activeCase.id}
            tc={activeCase}
            total={cases.length}
            onChange={updateCase}
            onRemove={removeCase}
            onRun={runCase}
          />
        )}
      </main>

    </div>
  );
}
