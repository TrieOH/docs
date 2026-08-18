import { Link } from 'waku';
import type { ReactNode } from 'react';

type Service = {
  name: string;
  tagline: string;
  groups: string[];
  href: string;
  icon: ReactNode;
};

function ShieldCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CalendarDays() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function CreditCard() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function ClipboardList() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  );
}

function BookOpen() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden>
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

const services: Service[] = [
  {
    name: 'IdentityX',
    tagline: 'Identity, auth & tenants — actors, projects, organizations, API keys, JWTs.',
    groups: ['authn', 'projects', 'actors', 'apikeys', 'oauthproviders', 'profiles'],
    href: '/docs/identityx',
    icon: <ShieldCheck />,
  },
  {
    name: 'Univents',
    tagline: 'Events, editions, ticketing, programs, badges & certifications, and the store.',
    groups: ['events', 'editions', 'ticket_types', 'products', 'checkouts', 'purchases'],
    href: '/docs/univents',
    icon: <CalendarDays />,
  },
  {
    name: 'Payssage',
    tagline: 'Payments — wallets, sellers, payment intents, provider OAuth, webhooks, test mode.',
    groups: ['wallets', 'intents', 'sellers', 'webhooks', 'testmode'],
    href: '/docs/payssage',
    icon: <CreditCard />,
  },
  {
    name: 'Informd',
    tagline: 'Multi-tenant forms — namespaces, forms, steps, fields, and responses.',
    groups: ['namespaces', 'forms', 'steps', 'fields', 'responses'],
    href: '/docs/informd',
    icon: <ClipboardList />,
  },
];

export default function Home() {
  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-fd-primary/10 to-transparent" />
        <div className="relative mx-auto max-w-3xl px-6 pt-20 pb-14 text-center sm:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-3 py-1 text-xs font-medium text-fd-muted-foreground">
            TrieOH · Developer Platform
          </span>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-fd-foreground sm:text-5xl">
            One identity.
            <br />
            Events, payments, and forms.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-fd-muted-foreground sm:text-lg">
            Four Go services, one identity platform, one response envelope.
            Every reference page here is generated from the OpenAPI spec each
            service serves itself.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              <BookOpen />
              Browse the docs
            </Link>
            <Link
              to="/docs/identityx"
              className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-4 py-2 text-sm font-medium text-fd-foreground transition-colors hover:border-fd-primary"
            >
              Start with IdentityX
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.name}
              to={service.href}
              className="group rounded-xl border border-fd-border bg-fd-card p-5 transition-colors hover:border-fd-primary"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-fd-muted text-fd-foreground transition-colors group-hover:bg-fd-primary group-hover:text-fd-primary-foreground">
                  {service.icon}
                </span>
                <h2 className="text-base font-semibold text-fd-foreground">
                  {service.name}
                </h2>
              </div>
              <p className="mt-3 text-sm text-fd-muted-foreground">
                {service.tagline}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {service.groups.map((group) => (
                  <span
                    key={group}
                    className="rounded-md border border-fd-border bg-fd-background px-1.5 py-0.5 font-mono text-[11px] text-fd-muted-foreground"
                  >
                    {group}
                  </span>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fd-primary">
                View guide
                <ArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getConfig() {
  return {
    render: 'static',
  };
}
