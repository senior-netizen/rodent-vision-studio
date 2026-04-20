import assert from 'node:assert/strict';
import test from 'node:test';

import {
  INVALID_PREVIEW_SOURCE_URL,
  type UrlPolicyConfig,
  validatePreviewSourceUrl,
} from '../lib/security/url-policy';

const baseConfig: UrlPolicyConfig = {
  environment: 'production',
  hostnameAllowlist: ['preview.rodent.co.zw', 'example.com'],
  allowedIpLiterals: [],
  allowedPorts: [],
  allowHttpInNonProduction: false,
};

function expectInvalid(url: string): void {
  const result = validatePreviewSourceUrl(url, baseConfig);
  assert.equal(result.ok, false, `expected URL to be rejected: ${url}`);

  if (!result.ok) {
    assert.equal(result.code, INVALID_PREVIEW_SOURCE_URL);
  }
}

test('rejects localhost IPv4 literal', () => {
  expectInvalid('https://127.0.0.1/preview.png');
});

test('rejects localhost IPv6 literal', () => {
  expectInvalid('https://[::1]/preview.png');
});

test('rejects cloud metadata endpoint', () => {
  expectInvalid('https://169.254.169.254/latest/meta-data');
});

test('rejects credential confusion attack host', () => {
  expectInvalid('https://example.com@evil.com/image.png');
});

test('rejects DNS rebinding-like hostnames', () => {
  expectInvalid('https://preview.127.0.0.1.nip.io/image.png');
});

test('normalizes mixed-case protocol and hostname', () => {
  const result = validatePreviewSourceUrl('hTtPs://ExAmPlE.CoM/path#fragment', baseConfig);

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.normalizedUrl, 'https://example.com/path');
  }
});

test('fails closed in production when host allowlist is unset', () => {
  const result = validatePreviewSourceUrl('https://example.com/path', {
    ...baseConfig,
    hostnameAllowlist: [],
  });

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.code, INVALID_PREVIEW_SOURCE_URL);
  }
});
