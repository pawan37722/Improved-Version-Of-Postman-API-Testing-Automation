import { useRef, useState } from 'react';
import { makeCase, executeCase } from '../utils/testRunner.js';

export default function useTesterState() {
  const counterRef = useRef(1);

  function nextNumber() {
    const n = counterRef.current;
    counterRef.current += 1;
    return n;
  }

  const [cases, setCases] = useState(() => [makeCase(nextNumber())]);
  const [activeId, setActiveId] = useState(null);

  const activeCaseId = activeId ?? cases[0]?.id;
  const activeCase = cases.find(c => c.id === activeCaseId) ?? cases[0];

  function addCase() {
    const newCase = makeCase(nextNumber(), cases[cases.length - 1]);
    setCases(prev => [...prev, newCase]);
    setActiveId(newCase.id);
  }

  function removeCase(id) {
    setCases(prev => {
      const next = prev.filter(c => c.id !== id);
      if (activeId === id) setActiveId(next[next.length - 1]?.id ?? null);
      return next;
    });
  }

  function updateCase(id, field, val) {
    setCases(prev => prev.map(c => (c.id === id ? { ...c, [field]: val } : c)));
  }

  async function runCase(id) {
    const tc = cases.find(c => c.id === id);
    if (!tc) return;

    setCases(prev => prev.map(c =>
      c.id === id ? { ...c, status: 'running', output: null, duration: null } : c
    ));

    const result = await executeCase(tc);

    setCases(prev => prev.map(c => (c.id === id ? { ...c, ...result } : c)));
  }

  async function runAll() {
    for (const c of cases) await runCase(c.id);
  }

  const counts = cases.reduce(
    (acc, c) => {
      if (c.status === 'pass') acc.pass++;
      else if (c.status === 'fail') acc.fail++;
      else if (c.status === 'error') acc.err++;
      return acc;
    },
    { pass: 0, fail: 0, err: 0 }
  );

  return {
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
  };
}
