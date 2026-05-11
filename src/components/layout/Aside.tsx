const Aside = () => {
  const items = [
    { label: "Location", value: "Stockholm · CET" },
    { label: "Status", value: "Taking on new clients" },
    { label: "Current", value: "Graph Protocol infrastructure" },
    { label: "Experience", value: "15 years in production" },
    { label: "Company", value: "Woven Signal - <a href='https://wovensignal.xyz' target='_blank' rel='noopener noreferrer'>wovensignal.xyz</a>" },
  ];

  return (
    <aside className="hidden lg:block w-48 shrink-0 pl-12 pt-4">
      <div className="space-y-6 border-l border-cream pl-6">
        {items.map((item) => (
          <div key={item.label}>
            <p className="font-sans text-xs uppercase tracking-wide text-muted-foreground/60 mb-1">
              {item.label}
            </p>
            <p className="font-sans text-small text-muted-foreground">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Aside;
