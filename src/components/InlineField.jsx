export default function InlineField({ value, onChange, placeholder, rows = 1, wide }) {
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
