import { rest, RestHandler, MockedRequest, DefaultBodyType } from 'msw'
import {
  modelsListMock,
  formInfo,
  formSchema,
  collectionInfo,
  collectionItems,
  collectionList,
} from './fixtures'

// All the urls and mocks
export const handlersFixtures = [
  {
    url: '/models',
    fixture: modelsListMock,
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
    url: '/collections',
    fixture: collectionList,
  },
  {
    url: '/collections/collection1',
    fixture: collectionInfo,
  },
  {
    url: '/collections/collection1/items',
    fixture: collectionItems,
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
