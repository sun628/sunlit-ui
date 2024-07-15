import { describe, it, expect } from 'vitest'
import type { Plugin } from 'vue'
import { get, map } from 'lodash-es'
import {
  NAlert,
  NButton,
  NButtonGroup,
  NCollapse,
  NCollapseItem,
  NIcon,
  NTooltip,
} from '../index'

const comps = [
  NAlert,
  NButton,
  NButtonGroup,
  NCollapse,
  NCollapseItem,
  NIcon,
  NTooltip,
] as Plugin[]

describe('components/index', () => {
  it.each(map(comps, (comp) => [get(comp, 'name') ?? '', comp]))(
    '%s should be exported',
    (_, component) => {
      expect(component).toBeDefined()
      expect(component.install).toBeDefined()
    }
  )
})
