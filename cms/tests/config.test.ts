import { describe, expect, it } from 'vitest'
import { slugField } from '../src/fields/common'

describe('content model', () => {
  it('enforces slug uniqueness and normalizes safe slugs', () => {
    const field: any = slugField('title')
    expect(field.unique).toBe(true)
    expect(field.hooks.beforeValidate[0]({ value: undefined, siblingData: { title: 'Safe & Stable Route!' } })).toBe('safe-stable-route')
  })
})
