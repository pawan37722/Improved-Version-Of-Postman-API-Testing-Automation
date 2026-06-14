export default function Badge({ status, duration }) {
  const cfg = {
    idle: { label: 'IDLE', cls: 'badge-idle' },
    running: { label: 'RUNNING', cls: 'badge-running' },
    pass: { label: 'PASS', cls: 'badge-pass' },
    fail: { label: 'FAIL', cls: 'badge-fail' },
    error: { label: 'ERROR', cls: 'badge-error' },
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
