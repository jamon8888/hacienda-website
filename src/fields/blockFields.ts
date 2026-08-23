import type { Field, GroupField } from 'payload'

import deepMerge from '../utilities/deepMerge'

interface Args {
  fields: Field[]
  name: string
  overrides?: Partial<GroupField>
}

export const themeField: (width?: number) => Field = (width) => ({
  name: 'theme',
  dbName: 'th',
  type: 'select',
  admin: {
    description: 'Leave blank for system default',
    width: width ? `${width}%` : '50%',
  },
  options: [
    {
      label: 'Light',
      value: 'light',
    },
    {
      label: 'Dark',
      value: 'dark',
    },
  ],
})

export const backgroundField: Field = {
  name: 'background',
  dbName: 'bg',
  type: 'select',
  admin: {
    width: '50%',
  },
  options: [
    {
      label: 'Solid',
      value: 'solid',
    },
    {
      label: 'Transparent',
      value: 'transparent',
    },
    {
      label: 'Gradient Up',
      value: 'gradientUp',
    },
    {
      label: 'Gradient Down',
      value: 'gradientDown',
    },
  ],
}

const shortenName = (name: string) => name.replace(/[^a-z0-9]/gi, '').toLowerCase().slice(0,3)||'x'

const assignDbNames = (fields: any[]): any[] => fields.map(f => {
  if (!f || typeof f !== 'object') return f
  const copy = {...f}
  if (copy.name && !copy.dbName) {
    copy.dbName = shortenName(copy.name)
  }
  if (Array.isArray(copy.fields)) {
    copy.fields = assignDbNames(copy.fields)
  }
  if (Array.isArray(copy.rows)) {
    copy.rows = assignDbNames(copy.rows)
  }
  if (copy.fields && typeof copy.fields === 'object') {
    // handle nested
  }
  return copy
})

export const blockFields = ({ name, fields, overrides }: Args): Field =>
  deepMerge(
    {
      name,
      dbName: shortenName(name),
      type: 'group',
      admin: {
        hideGutter: true,
        style: {
          margin: 0,
          padding: 0,
        },
      },
      fields: [
        {
          type: 'collapsible',
          fields: [
          {
            name: 'settings',
            dbName: 'set',
            type: 'group',
            admin: {
              hideGutter: true,
              initCollapsed: true,
            },
              fields: [
                {
                  type: 'row',
                  fields: [themeField(), backgroundField],
                },
              ],
              label: false,
            },
          ],
          label: 'Settings',
        },
        ...assignDbNames(fields),
      ],
      label: false,
    },
    overrides,
  )
