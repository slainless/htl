import { serve } from '!framework/server/index.ts'
import config from '../build.config.ts'

serve([config.dev.outDir, './static']).listen()