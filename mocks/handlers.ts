import { http, HttpResponse } from 'msw'
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
  baseURL: 'https://query.starlightcms.io/v2',
  workspace: 'test-workspace',
}

// Create the handlers
export const createHandlers = ({
  baseURL,
  workspace,
}: HandlersProps = defaultProps) => {
  const workspaceURL = `${baseURL}/workspaces/${workspace}`

  return handlersFixtures.map(({ url, fixture }) =>
    http.get(`${workspaceURL}${url}`, () => {
      return HttpResponse.json(fixture)
    }),
  )
}
