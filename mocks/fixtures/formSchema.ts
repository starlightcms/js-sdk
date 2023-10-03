export const formSchema = {
  data: {
    version: 2,
    groups: [
      {
        title: 'Informações básicas',
        type: 'group',
        fields: [
          {
            title: 'Name',
            key: 'name',
            type: 'string',
            is_required: false,
            is_listable: false,
            is_private: false,
            is_archived: false,
            is_unique: false,
            is_identifier: false,
            rules: {
              max: 1000,
              min: 0,
            },
          },
          {
            title: 'Message',
            key: 'message',
            type: 'string',
            is_required: false,
            is_listable: false,
            is_private: false,
            is_archived: false,
            is_unique: false,
            is_identifier: false,
            rules: {
              max: 1000,
              min: 0,
            },
          },
          {
            title: 'Accepted newsletter',
            key: 'accepted_newsletter',
            type: 'boolean',
            is_required: false,
            is_listable: false,
            is_private: false,
            is_archived: false,
            is_unique: false,
            is_identifier: false,
          },
        ],
      },
    ],
    action_url:
      'https://submit.starlightcms.io/v2/organizations/org1/workspaces/workspace1/forms/form1',
  },
}
