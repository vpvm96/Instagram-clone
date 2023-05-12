import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.REACT_APP_SANITY_CONFIG_PROJECT_ID as string,
    dataset: 'production',
  },
})
