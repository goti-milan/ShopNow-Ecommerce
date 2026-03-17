import { Suspense } from "react"
import StoreClient from './StoreClient'

const page = () => {
  return (
    <Suspense fallback={null}>
      <StoreClient />
    </Suspense>
  )
}

export default page
