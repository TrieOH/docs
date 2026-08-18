import { createOpenAPI } from 'fumadocs-openapi/server';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const schemaDirectory = path.join(process.cwd(), '.source', 'openapi');

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

          // Services serve their OpenAPI spec as YAML at /docs/openapi.yml.
          // json-schema-ref-parser (used by fumadocs-openapi) picks the
          // parser from the file extension, so keep the source format.
          const ext = response.headers
            .get('content-type')
            ?.includes('yaml')
            ? '.yml'
            : service.url.endsWith('.yml') || service.url.endsWith('.yaml')
              ? '.yml'
              : '.json';

          const schemaPath = path.join(
            schemaDirectory,
            `${service.name.replace(/[^a-zA-Z0-9_-]/g, '-')}${ext}`,
          );

          await mkdir(schemaDirectory, { recursive: true });
          await writeFile(schemaPath, await response.text(), 'utf8');

          return {
            ...service,
            path: schemaPath,
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
    inputs.map(({ name, path: schemaPath }) => [name, schemaPath]),
  ),
});
