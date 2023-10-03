export const collectionList = {
  data: [
    {
      id: 2345678901,
      title: 'Collection1',
      slug: 'collection1',
      type: 'entry',
      item_count: 6,
      created_at: '2023-04-10T19:11:06.000000Z',
      updated_at: '2023-06-05T12:53:47.000000Z',
    },
    {
      id: 697812345,
      title: 'Collection2',
      slug: 'collection2',
      type: 'media',
      item_count: 4,
      created_at: '2023-06-13T17:08:30.000000Z',
      updated_at: '2023-06-13T17:08:30.000000Z',
    },
    {
      id: 5032748691,
      title: 'Collection3',
      slug: 'collection3',
      type: 'singleton',
      item_count: 2,
      created_at: '2023-06-09T19:32:32.000000Z',
      updated_at: '2023-06-09T19:32:32.000000Z',
    },
  ],
  links: {
    first:
      'https://query.starlightcms.io/v2/workspaces/workspace1/collections?page=1',
    last: 'https://query.starlightcms.io/v2/workspaces/workspace1/collections?page=1',
    prev: null,
    next: null,
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    links: [
      {
        url: null,
        label: '&laquo; Previous',
        active: false,
      },
      {
        url: 'https://query.starlightcms.io/v2/workspaces/workspace1/collections?page=1',
        label: '1',
        active: true,
      },
      {
        url: null,
        label: 'Next &raquo;',
        active: false,
      },
    ],
    path: 'https://query.starlightcms.io/v2/workspaces/workspace1/collections',
    per_page: 15,
    to: 3,
    total: 3,
  },
}
