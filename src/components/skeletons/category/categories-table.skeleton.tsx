import React from "react";

const CategoriesTableSkeleton = () => {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Products</th>
            <th className="text-right p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, i) => (
            <tr key={i} className="border-b">
              <td className="p-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              </td>
              <td className="p-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4"></div>
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-12"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTableSkeleton;
