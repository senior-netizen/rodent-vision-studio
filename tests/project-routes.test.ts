import * as assert from 'node:assert/strict';
import test from 'node:test';

import { projectById, projectConfigs, projectIdBySlug } from '../data/projects';

test('every generated public project link resolves to its expected case study', () => {
  for (const project of projectConfigs) {
    const generatedPath = `/projects/${project.slug}`;
    const routeSlug = generatedPath.slice('/projects/'.length);
    const resolvedId = projectIdBySlug[routeSlug];

    assert.equal(resolvedId, project.id, `${generatedPath} should resolve to ${project.id}`);
    assert.equal(projectById[resolvedId], project, `${generatedPath} should not resolve to notFound()`);
  }
});

test('project slugs are unique and cover the complete project registry', () => {
  assert.equal(new Set(projectConfigs.map((project) => project.slug)).size, projectConfigs.length);
  assert.equal(Object.keys(projectIdBySlug).length, projectConfigs.length);
});
