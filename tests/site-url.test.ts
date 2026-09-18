import assert from 'node:assert/strict';
import test from 'node:test';
import { getSiteOrigin } from '../lib/site-url';

function withEnvironment(
  values: { NODE_ENV: string; NEXT_PUBLIC_SITE_URL?: string },
  callback: () => void,
) {
  const previousNodeEnv = process.env.NODE_ENV;
  const previousSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  Reflect.set(process.env, 'NODE_ENV', values.NODE_ENV);
  if (values.NEXT_PUBLIC_SITE_URL === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = values.NEXT_PUBLIC_SITE_URL;

  try {
    callback();
  } finally {
    if (previousNodeEnv === undefined) Reflect.deleteProperty(process.env, 'NODE_ENV');
    else Reflect.set(process.env, 'NODE_ENV', previousNodeEnv);
    if (previousSiteUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = previousSiteUrl;
  }
}

test('uses the configured site origin', () => {
  withEnvironment(
    { NODE_ENV: 'production', NEXT_PUBLIC_SITE_URL: 'https://rodent.co.zw' },
    () => assert.equal(getSiteOrigin(), 'https://rodent.co.zw'),
  );
});

test('rejects a missing production site URL', () => {
  withEnvironment({ NODE_ENV: 'production' }, () => {
    assert.throws(() => getSiteOrigin(), /required in production/);
  });
});

for (const malformedValue of [
  'not a URL',
  'ftp://rodent.co.zw',
  'https://user:password@rodent.co.zw',
  'https://rodent.co.zw/a-path',
  'https://rodent.co.zw?preview=true',
  'https://rodent.co.zw#fragment',
  'http://rodent.co.zw',
]) {
  test(`rejects invalid production value: ${malformedValue}`, () => {
    withEnvironment(
      { NODE_ENV: 'production', NEXT_PUBLIC_SITE_URL: malformedValue },
      () => assert.throws(() => getSiteOrigin(), /NEXT_PUBLIC_SITE_URL/),
    );
  });
}

test('uses the local development origin when unconfigured outside production', () => {
  withEnvironment({ NODE_ENV: 'development' }, () => {
    assert.equal(getSiteOrigin(), 'http://localhost:8080');
  });
});
