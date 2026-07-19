import { createOpenAPI } from 'fumadocs-openapi/server';

function parseServicesEnv() {
  const raw = process.env.OPENAPI_SERVICES;

  if (!raw) return [];

  return raw.split(',').map((entry) => {
    const [name, url] = entry.split('|');

    if (!name || !url) return null;

    return {
      name: name.trim(),
      url: url.trim(),
    };
  }).filter((service): service is {
    name: string;
    url: string;
  } => service !== null);
}

export const services = parseServicesEnv();

async function resolveAvailableInputs() {
  const results = await Promise.allSettled(
    services.map((service) =>
      fetch(service.url, { signal: AbortSignal.timeout(3000) })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          return {
            ...service,
            schema: await response.json(),
          };
        })
    )
  );
  return results.flatMap((result) =>
    result.status === 'fulfilled' ? [result.value] : []
  );
}

export const inputs = await resolveAvailableInputs();

export const openapi = createOpenAPI({
  input: async () => Object.fromEntries(
    inputs.map(({ name, schema }) => [name, schema]),
  ),
});
