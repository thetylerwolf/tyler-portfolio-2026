type AsideItem = {
  label: string;
  value: string;
  link?: {
    href: string;
    text: string;
  };
};

const Aside = () => {
  const items: AsideItem[] = [
    { label: "Location", value: "Stockholm · CET" },
    { label: "Status", value: "Taking on new clients" },
    { label: "Current", value: "Graph Protocol infrastructure" },
    { label: "Experience", value: "15 years in production" },
    {
      label: "Company",
      value: "Woven Signal",
      link: {
        href: "https://wovensignal.xyz",
        text: "wovensignal.xyz",
      },
    },
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
            {item.link && (
              <a
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-small text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
              >
                {item.link.text}
              </a>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Aside;
