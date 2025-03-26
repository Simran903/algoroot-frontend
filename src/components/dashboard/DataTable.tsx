"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface DataItem {
  id: number;
  name: string;
  email: string;
  age: number;
  city: string;
}

// Generate mock data
const generateMockData = (): DataItem[] =>
  Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    age: Math.floor(Math.random() * 50) + 20,
    city: ["New York", "San Francisco", "Chicago", "Boston", "Seattle"][
      Math.floor(Math.random() * 5)
    ],
  }));

export function DataTable() {
  const [data] = useState<DataItem[]>(generateMockData());
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof DataItem | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtering and sorting
  const processedData = useMemo(() => {
    let result = [...data];

    // Search filter
    if (searchTerm) {
      result = result.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sorting
    if (sortColumn) {
      result.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, sortColumn, sortDirection]);

  // Pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedData.slice(startIndex, startIndex + itemsPerPage);
  }, [processedData, currentPage]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);

  const handleSort = (column: keyof DataItem) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (column: keyof DataItem) => {
    if (sortColumn !== column) return <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4 text-blue-600" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4 text-blue-600" />
    );
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* Search Input */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">
        <Input
          placeholder="Search across all columns..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-96 border-2 border-gray-200 focus:border-blue-500 transition-colors"
        />
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-100">
            <TableRow>
              {(["id", "name", "email", "age", "city"] as (keyof DataItem)[]).map((column) => (
                <TableHead
                  key={column}
                  onClick={() => handleSort(column)}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors group"
                >
                  <div className="flex items-center">
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                    {renderSortIcon(column)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                <TableCell className="px-4 py-2">{item.id}</TableCell>
                <TableCell className="px-4 py-2">{item.name}</TableCell>
                <TableCell className="px-4 py-2">{item.email}</TableCell>
                <TableCell className="px-4 py-2">{item.age}</TableCell>
                <TableCell className="px-4 py-2">{item.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4 bg-gray-50 p-3 rounded-b-lg text-sm sm:text-base">
        <div className="text-gray-700">
          Page {currentPage} of {totalPages} <span>({processedData.length} total results)</span>
        </div>
        <div className="flex space-x-2">
          {[ChevronFirst, ChevronLeft, ChevronRight, ChevronLast].map((Icon, index) => (
            <Button
              key={index}
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage(
                  index === 0 ? 1 : 
                  index === 1 ? Math.max(1, currentPage - 1) : 
                  index === 2 ? Math.min(totalPages, currentPage + 1) : 
                  totalPages
                )
              }
              disabled={(index === 0 || index === 1) && currentPage === 1}
              className="hover:bg-blue-50 disabled:opacity-50"
            >
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
