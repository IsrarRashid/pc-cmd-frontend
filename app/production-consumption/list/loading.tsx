import Skeleton from "@/app/components/Skeleton";

const LoadingPage = () => {
  const data = [1];

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Table Header and Add Button */}
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Image Price</h2>
        {/* <Skeleton width={156} height={40} borderRadius={10} /> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm text-gray-600">ID</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">
                Currency
              </th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">
                Price
              </th>
              <th
                // colSpan={2}
                className="px-6 py-3 text-center text-sm text-gray-600"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((d, i) => (
              <tr key={i} className="border-b">
                <td className="px-6 py-4 text-sm text-gray-600">
                  <Skeleton />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <Skeleton />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <Skeleton />
                </td>
                <td className="text-center px-6 py-4 ">
                  <Skeleton />
                </td>
                {/* <td className="text-center px-6 py-4 ">
                  <Skeleton />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoadingPage;
