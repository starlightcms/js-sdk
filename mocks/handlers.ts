import { rest, RestHandler, MockedRequest, DefaultBodyType } from 'msw'
import {
  collectionInfo,
  collectionItems,
  collectionList,
  entryInfo,
  entryList,
  formInfo,
  formSchema,
  mediaInfo,
  mediaList,
  modelCategoryEntries,
  modelCategoryInfo,
  modelCategoryList,
  modelInfo,
  modelList,
  searchResult,
  singletonInfo,
  singletonList,
} from './fixtures'

// All the urls and mocks
export const handlersFixtures = [
  {
    url: '/collections/collection1',
    fixture: collectionInfo,
  },
  {
    url: '/collections/collection1/items',
    fixture: collectionItems,
  },
  {
    url: '/collections',
    fixture: collectionList,
  },
  {
    url: '/models/model1/entries/entry1',
    fixture: entryInfo,
  },
  {
    url: '/models/model1/entries',
    fixture: entryList,
  },
  {
    url: '/forms/form1',
    fixture: formInfo,
  },
  {
    url: '/forms/form1/schema',
    fixture: formSchema,
  },
  {
    url: '/media/1234567899',
    fixture: mediaInfo,
  },
  {
    url: '/media',
    fixture: mediaList,
  },
  {
    url: '/models/model1/categories/category1',
    fixture: modelCategoryInfo,
  },
  {
    url: '/models/model1/categories/category1/entries',
    fixture: modelCategoryEntries,
  },
  {
    url: '/models/model1/categories',
    fixture: modelCategoryList,
  },
  {
    url: '/models/model1',
    fixture: modelInfo,
  },
  {
    url: '/models',
    fixture: modelList,
  },
  {
    url: '/search/entries',
    fixture: searchResult,
  },
  {
    url: '/singletons/singleton1',
    fixture: singletonInfo,
  },
  {
    url: '/singletons',
    fixture: singletonList,
  },
]

interface HandlersProps {
  baseURL?: string
  workspace?: string
}

const defaultProps = {
  baseURL: 'https://query.starlightcms.io/v2',
  workspace: 'test-workspace',
}

// Create the handlers
export const createHandlers = ({
  baseURL,
  workspace,
}: HandlersProps = defaultProps): RestHandler<
  MockedRequest<DefaultBodyType>
>[] => {
  const workspaceURL = `${baseURL}/workspaces/${workspace}`

  return handlersFixtures.map(({ url, fixture }) =>
    rest.get(`${workspaceURL}${url}`, (req, res, ctx) => res(ctx.json(fixture)))
  )
}
