import { useOutletContext } from 'react-router-dom';
import CaseCard from '../components/CaseCard.jsx';

export default function Home() {
  const {
    cases,
    activeCaseId,
    activeCase,
    counts,
    setActiveId,
    addCase,
    removeCase,
    updateCase,
    runCase,
    runAll,
  } = useOutletContext();

  return (
    <div className="tester">
      <div className="toolbar">
        <div className="stats">
          <span className="s-pass">✓ {counts.pass} Passed</span>
          <span className="s-fail">✗ {counts.fail} Failed</span>
          <span className="s-err">⚠ {counts.err} Error</span>
        </div>
        <div className="toolbar-actions">
          <button className="btn-run-all" onClick={runAll}>▶ Run All</button>
          <button className="btn-add" onClick={addCase}>+ Add Case</button>
        </div>
      </div>

      <div className="tabs-bar">
        {cases.map(c => (
          <div
            key={c.id}
            className={`tab tab-${c.status}${c.id === activeCaseId ? ' tab-active' : ''}`}
            onClick={() => setActiveId(c.id)}
          >
            {c.status === 'pass' && <span className="td-pass">✓</span>}
            {c.status === 'fail' && <span className="td-fail">✗</span>}
            {c.status === 'error' && <span className="td-err">⚠</span>}
            {(c.status === 'idle' || c.status === 'running') && <span className="td-idle">○</span>}
            {c.name}
          </div>
        ))}
      </div>

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
