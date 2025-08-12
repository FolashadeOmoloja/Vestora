import React from "react";

type Column<T> = {
  header: string;
  accessor: keyof T;
  cell?: (value: any, row: T) => React.ReactNode;
};

type DynamicTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

function DynamicTable<T extends object>({
  columns,
  data,
}: DynamicTableProps<T>) {
  return (
    <div className="w-full max-w-screen">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#002C6C] text-white">
              {columns.map((col, i) => (
                <th key={i} className="py-2 px-4">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-gray-300 hover:bg-gray-50">
                {columns.map((col, j) => (
                  <td key={j} className="py-2 px-4">
                    {typeof col.cell === "function"
                      ? col.cell(row[col.accessor], row)
                      : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DynamicTable;
