import React, { useState, useEffect, Suspense } from "react";
import {
  Search,
  Download,
  CheckCircle,
  XCircle,
  Calendar,
  Trash2,
} from "lucide-react";
import { FcInvite } from "react-icons/fc";
import { usermaindashboardlist, deleteUser } from "../../API/UserApi";
import EmailRoleModal from "./EmailRoleModal";

import sort from "../../assest/Sort.png";
import filter from "../../assest/Filter.png";
import Loader from "../../Loader";

interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

const ConfirmModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmLabel?: string;
}> = ({ open, onClose, onConfirm, message, confirmLabel = "Delete" }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-3">Confirm</h3>
        <p className="text-sm text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 border rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

type SortConfig = {
  column: string;
  direction: "asc" | "desc";
} | null;

const UserDetails: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [multiSearch, setMultiSearch] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [open, setOpen] = useState(false);

  // modals
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  const itemsPerPage = 10;

  // selection states
  const [selectedIds, setSelectedIds] = useState<Set<any>>(new Set());
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState<any[]>([]);
  const [confirmMessage, setConfirmMessage] = useState("");

  // NEW: sort config
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const fetchUsers = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res: ApiResponse<any> = await usermaindashboardlist(pageNum);
      setData(res.results);
      setCount(res.count);
      setNext(res.next);
      setPrevious(res.previous);

      if (res.results.length > 0) {
        setColumns(Object.keys(res.results[0]));
      } else {
        setColumns([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const totalPages = Math.ceil(count / itemsPerPage);

  // Filtering
  const filteredData = data.filter((row) => {
    const matchesSearch =
      multiSearch.length === 0 ||
      multiSearch.some((term) =>
        Object.values(row).join(" ").toLowerCase().includes(term.toLowerCase())
      );

    const matchesFilters = Object.entries(filters).every(([col, values]) => {
      if (!values || values.length === 0) return true;
      return values.includes(row[col]?.toString());
    });

    return matchesSearch && matchesFilters;
  });

  // Sorting
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return filteredData;
    const { column, direction } = sortConfig;
    return [...filteredData].sort((a, b) => {
      const valA = a[column];
      const valB = b[column];
      if (valA == null) return 1;
      if (valB == null) return -1;
      if (valA === valB) return 0;
      return direction === "asc"
        ? valA > valB
          ? 1
          : -1
        : valA < valB
        ? 1
        : -1;
    });
  }, [filteredData, sortConfig]);

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // unique values per column
  const uniqueColumnValues = (col: string) => {
    return Array.from(
      new Set(data.map((row) => row[col]?.toString()).filter(Boolean))
    );
  };

  // Handle filter checkbox
  const handleCheckboxChange = (col: string, value: string) => {
    setFilters((prev) => {
      const current = prev[col] || [];
      if (current.includes(value)) {
        return { ...prev, [col]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [col]: [...current, value] };
      }
    });
  };

  // Status badges
  const getStatusBadge = (value: any) => {
    if (typeof value === "boolean") {
      return value ? (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" /> True
        </span>
      ) : (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" /> False
        </span>
      );
    }
    if (value === "active") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" /> Active
        </span>
      );
    }
    if (value === "inactive") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Calendar className="w-3 h-3 mr-1" /> Inactive
        </span>
      );
    }
    if (value === "resigned") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" /> Resigned
        </span>
      );
    }
    return value?.toString() || "-";
  };

  // toggle selection for single id
  const toggleSelect = (id: any) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // select all visible rows
  const toggleSelectAllVisible = () => {
    const visibleIds = paginatedData.map((r) => r.id);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const allSelected = visibleIds.every((id) => next.has(id));
      if (allSelected) {
        visibleIds.forEach((id) => next.delete(id));
      } else {
        visibleIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const handleSingleDeleteConfirm = (id: any, name?: string) => {
    setPendingDeleteIds([id]);
    setConfirmMessage(
      `Are you sure you want to delete ${name ? `${name}` : "this user"}? This action cannot be undone.`
    );
    setIsConfirmOpen(true);
  };

  const handleBulkDeleteConfirm = () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) {
      alert("Please select at least one user to delete.");
      return;
    }
    setPendingDeleteIds(ids);
    setConfirmMessage(
      `Are you sure you want to delete ${ids.length} selected user(s)? This action cannot be undone.`
    );
    setIsConfirmOpen(true);
  };

  const performDelete = async () => {
    setIsConfirmOpen(false);
    if (pendingDeleteIds.length === 0) return;
    try {
      setLoading(true);
      await Promise.all(
        pendingDeleteIds.map(async (id) => {
          try {
            await deleteUser(id);
          } catch (err) {
            console.error(`Failed to delete ${id}:`, err);
          }
        })
      );
      await fetchUsers(page);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        pendingDeleteIds.forEach((id) => next.delete(id));
        return next;
      });
      setPendingDeleteIds([]);
      alert("Deletion completed.");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Some deletes may have failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const IconButton: React.FC<{
    src: string;
    alt?: string;
    onClick?: () => void;
    title?: string;
  }> = ({ src, alt = "icon", onClick, title }) => {
    return (
      <button
        onClick={onClick}
        title={title}
        className="relative group h-9 w-9 flex items-center justify-center p-1 rounded-md hover:bg-gray-100 transition"
        style={{ minWidth: 36 }}
      >
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full object-contain pointer-events-none"
        />
        <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          {title}
        </span>
      </button>
    );
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
        <div className="flex items-center space-x-3">
          <div
            style={{ color: "#e4122eff", cursor: "pointer" }}
            onClick={() => setOpen(true)}
          >
            <FcInvite size={35} />
          </div>
          {open && (
            <Suspense fallback={<div>Loading...</div>}>
              <EmailRoleModal open={open} onClose={() => setOpen(false)} />
            </Suspense>
          )}
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:transform hover:scale-105">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchInput.trim()) {
                    setMultiSearch([...multiSearch, searchInput.trim()]);
                    setSearchInput("");
                  }
                }}
                className="pl-10 pr-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Search tags */}
            <div className="flex flex-wrap gap-2">
              {multiSearch.map((term, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center space-x-1"
                >
                  <span>{term}</span>
                  <button
                    onClick={() =>
                      setMultiSearch(multiSearch.filter((_, i) => i !== idx))
                    }
                    className="ml-1"
                  >
                    <XCircle className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Filter button */}
            <IconButton
              src={filter}
              alt="filter"
              onClick={() => setIsFilterModalOpen(true)}
              title="Filter"
            />

            {/* Sort button */}
            <IconButton
              src={sort}
              alt="sort"
              onClick={() => setIsSortModalOpen(true)}
              title="Sort"
            />
          </div>

          <div className="text-sm text-gray-600">
            Showing {paginatedData.length} of {filteredData.length} users
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-gray-500">
              {" "}
              <Loader />{" "}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 ">
                <tr>
                  {/* checkbox header */}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        onChange={toggleSelectAllVisible}
                        checked={
                          paginatedData.length > 0 &&
                          paginatedData.every((r) => selectedIds.has(r.id))
                        }
                        aria-label="Select all visible"
                        className="mr-2 border-purp"
                      />
                      <span className="hidden sm:inline">Select</span>
                    </div>
                  </th>

                  {columns.map((col) => (
                    <th
                      key={col}
                      className="px-6 py-3 text-left text-xs text-white bg-violet-500 font-medium uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    {/* row checkbox */}
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(row.id)}
                        onChange={() => toggleSelect(row.id)}
                        aria-label={`Select ${row.id}`}
                      />
                    </td>

                    {columns.map((col, i) => (
                      <td
                        key={col}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {i === 0 ? (
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm font-medium text-blue-800">
                                {row[col]?.toString().charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>{row[col]}</div>
                          </div>
                        ) : (
                          getStatusBadge(row[col])
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleSingleDeleteConfirm(row.id, row[columns[0]])
                          }
                          className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                        >
                          <Trash2 className="w-4 h-4" /> <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* bulk action bar */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">
              {selectedIds.size} selected
            </span>
            <button
              onClick={handleBulkDeleteConfirm}
              disabled={selectedIds.size === 0}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedIds.size === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-red-600 text-white"
              }`}
            >
              Delete Selected
            </button>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!previous}
                className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={!next}
                className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div
          className="fixed inset-0 flex justify-end z-50"
          onClick={() => setIsFilterModalOpen(false)}
        >
          <div
            className="bg-white w-80 h-screen p-6 shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Filters</h3>
              <button onClick={() => setIsFilterModalOpen(false)}>
                <XCircle className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {columns.map((col) => (
              <div key={col} className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  {col}
                </label>
                <select
                  value={filters[col] || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, [col]: e.target.value }))
                  }
                  className="w-full border px-2 py-1 rounded"
                >
                  <option value="">All</option>
                  {uniqueColumnValues(col).map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => {
                  setFilters({});
                  setIsFilterModalOpen(false);
                }}
                className="px-4 py-2 border rounded"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sort Modal */}
      {isSortModalOpen && (
        <div
          className="fixed inset-0 flex justify-end z-50"
          onClick={() => setIsSortModalOpen(false)}
        >
          <div
            className="bg-white w-72 h-screen p-6 shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Sorting</h3>
              <button onClick={() => setIsSortModalOpen(false)}>
                <XCircle className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <label className="block text-sm font-medium text-gray-600 mb-2">
              Column
            </label>
            <select
              value={sortConfig?.column || ""}
              onChange={(e) =>
                setSortConfig((prev) => ({
                  column: e.target.value,
                  direction: prev?.direction || "asc",
                }))
              }
              className="w-full border px-2 py-1 rounded mb-4"
            >
              <option value="">None</option>
              {columns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium text-gray-600 mb-2">
              Direction
            </label>
            <select
              value={sortConfig?.direction || "asc"}
              onChange={(e) =>
                setSortConfig((prev) =>
                  prev
                    ? { ...prev, direction: e.target.value as "asc" | "desc" }
                    : {
                        column: columns[0],
                        direction: e.target.value as "asc" | "desc",
                      }
                )
              }
              className="w-full border px-2 py-1 rounded"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => {
                  setSortConfig(null);
                  setIsSortModalOpen(false);
                }}
                className="px-4 py-2 border rounded"
              >
                Clear
              </button>
              <button
                onClick={() => setIsSortModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm modal */}
      <ConfirmModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={performDelete}
        message={confirmMessage}
        confirmLabel="Delete"
      />
    </div>
  );
};

export default UserDetails;
