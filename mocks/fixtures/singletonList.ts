export const singletonList = {
  data: [
    {
      id: 3456789012,
      title: 'Singleton1',
      slug: 'singleton1',
      category: {
        id: 1098765432,
        title: 'Páginas',
        slug: 'pages',
        singleton_count: 0,
        created_at: '2023-04-04T12:00:18.000000Z',
        updated_at: '2023-04-04T12:00:18.000000Z',
      },
      updated_at: '2023-06-05T13:16:34.000000Z',
      published_at: '2023-04-04 19:11:38',
    },
    {
      id: 9876543210,
      title: 'Singleton2',
      slug: 'singleton2',
      category: {
        id: 1098765432,
        title: 'Páginas',
        slug: 'pages',
        singleton_count: 0,
        created_at: '2023-04-04T12:00:18.000000Z',
        updated_at: '2023-04-04T12:00:18.000000Z',
      },
      updated_at: '2023-08-08T15:59:15.000000Z',
      published_at: '2023-06-12 12:34:12',
    },
  ],
  links: {
    first:
      'https://query.starlightcms.io/v2/workspaces/workspace1/singletons?page=1',
    last: 'https://query.starlightcms.io/v2/workspaces/workspace1/singletons?page=1',
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
        url: 'https://query.starlightcms.io/v2/workspaces/workspace1/singletons?page=1',
        label: '1',
        active: true,
      },
      {
        url: null,
        label: 'Next &raquo;',
        active: false,
      },
    ],
    path: 'https://query.advancecomunicacao.com.br/v2/workspaces/workspace1/singletons',
    per_page: 15,
    to: 2,
    total: 2,
  },
}
