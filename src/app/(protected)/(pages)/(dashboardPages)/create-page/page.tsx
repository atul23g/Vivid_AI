import { Suspense } from "react";
import CreatePageSkeleton from "./_components/createPage/CreatePageSkeleton";
import RenderPage from "./_components/RenderPage";



export default function Page() {
  return (
    <main className="h-full w-full pt-6">
      <Suspense fallback={<CreatePageSkeleton />}>
      <RenderPage />
      </Suspense>
    </main>
  );
}