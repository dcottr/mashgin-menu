export default async function Page({
  params,
}: {
  params: Promise<{ categoryID: string }>;
}) {
  const categoryID = (await params).categoryID;
  return <div>Category ID: {categoryID}</div>;
}
