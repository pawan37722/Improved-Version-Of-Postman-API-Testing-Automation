import Badge from './Badge.jsx';
import InlineField from './InlineField.jsx';
import HardcodedToken from './HardcodedToken.jsx';

export default function CaseCard({ tc, onChange, onRemove, onRun, total }) {
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

      <div className="case-body">
        <div className="pane pane-code">
          <div className="pane-label"><span className="dot dot-blue" />Request</div>

          <div className="fetch-template">
            <div className="ft-line">
              <HardcodedToken>const</HardcodedToken><span className="ft-var"> url </span><HardcodedToken>= '</HardcodedToken>
              <InlineField value={tc.url} onChange={set('url')} wide placeholder="https://api.example.com/data" />
              <HardcodedToken>';</HardcodedToken>
            </div>

            <div className="ft-line ft-mt">
              <HardcodedToken>const</HardcodedToken><span className="ft-var"> data </span><HardcodedToken>= {'{'}</HardcodedToken>
            </div>
            <div className="ft-block">
              <InlineField
                value={tc.bodyText}
                onChange={set('bodyText')}
                wide rows={3}
                placeholder={`"key": "value"`}
              />
            </div>
            <div className="ft-line"><HardcodedToken>{'};'}</HardcodedToken></div>

            <div className="ft-line ft-mt">
              <HardcodedToken>fetch(url, {'{'}</HardcodedToken>
            </div>

            <div className="ft-line ft-i1">
              <HardcodedToken>method: '</HardcodedToken>
              <InlineField value={tc.method} onChange={set('method')} placeholder="POST" />
              <HardcodedToken>',</HardcodedToken>
            </div>

            <div className="ft-line ft-i1"><HardcodedToken>headers: {'{'}</HardcodedToken></div>
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
            <div className="ft-line ft-i1"><HardcodedToken>{'}'} ,</HardcodedToken></div>

            <div className="ft-line ft-i1">
              <HardcodedToken>body: JSON.stringify(data)</HardcodedToken>
            </div>

            <div className="ft-line"><HardcodedToken>{'});'}</HardcodedToken></div>
          </div>
        </div>

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
