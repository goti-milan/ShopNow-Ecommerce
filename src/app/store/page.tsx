import { Suspense } from "react";
import StoreClient from "./MarketClient";

const page = () => {
  return (
    <Suspense fallback={null}>
      <StoreClient />
    </Suspense>
  );
};

export default page;
