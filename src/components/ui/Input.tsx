interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-ink)]">
      {label ? <span>{label}</span> : null}
      <input className={`rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 outline-none ring-0 focus:border-[var(--color-primary)] ${className}`.trim()} {...props} />
    </label>
  );
}
