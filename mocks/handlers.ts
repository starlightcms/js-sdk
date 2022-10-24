import { rest, RestHandler, MockedRequest, DefaultBodyType } from 'msw'
import { modelsListMock } from './fixtures'

// All the urls and mocks
export const handlersFixtures = [
  {
    url: '/models',
    fixture: modelsListMock,
  },
]

interface HandlersProps {
  baseURL?: string
  workspace?: string
}

const defaultProps = {
  baseURL: 'https://query.starlight.sh/v2',
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
