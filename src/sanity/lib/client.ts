import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token:'skMzTpOEJXS2EOCGnKjGRw73gkGGZYpXNS3EUS5mjTSg6zMIft4qeFNlcqYlDW6GV1zCoGYJn0SqAKWKuVd91r4GGBTDpQUgj154wclnBT2decmzL76UGIycbXhMVjf0zT3Ipneqqn3LiyZEIFhejhW2q2PsZmLc3SkO2o4Mg5htwHKxro0V'
})
