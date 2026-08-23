import type { Block } from 'payload'

import { blockFields } from '../../fields/blockFields'
import linkGroup from '../../fields/linkGroup'

export const LinkGrid: Block = {
  slug: 'linkGrid',
  dbName: 'lin',
  fields: [
    blockFields({
      name: 'linkGridFields',
      fields: [
        linkGroup({
          appearances: false,
        }),
      ],
    }),
  ],
}
