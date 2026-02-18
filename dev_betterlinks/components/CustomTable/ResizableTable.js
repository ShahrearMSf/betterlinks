import TableLoader from 'components/Loader/TableLoader';
import { useState, useRef, useEffect } from 'react';

export default function ResizableTable({
  columns: initialColumns,
  data,
  defaultSortKey,
  defaultSortDirection = 'asc',
  onSelectedRowsChange,
  selectableRows = false,
  selectedRowKey = 'ID',
  clearSelectedRows = false,
  customCellRender = {},
  enablePagination = true,
  loading = false,
  storageKey = 'betterlinks-table-columns',
}) {
  const buildColumns = (cols, withCheckbox) => ([
    ...(withCheckbox
      ? [{
          key: '__checkbox__',
          label: '',
          width: 40,
          minWidth: 40,
          sortable: false,
        }]
      : []),
    ...cols.map((col) => ({
      ...col,
      width: col.width || 150,
      minWidth: col.minWidth || 80,
      sortable: col.sortable !== false,
    })),
  ]);


  // Load column widths from localStorage if available
  const getStoredWidths = () => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const buildColumnsWithWidths = (cols, withCheckbox) => {
    const stored = getStoredWidths();
    return buildColumns(cols, withCheckbox).map((col, idx) => {
      if (stored && stored[idx] && stored[idx].width) {
        return { ...col, width: stored[idx].width };
      }
      return col;
    });
  };

  const [columns, setColumns] = useState(buildColumnsWithWidths(initialColumns || [], selectableRows));

  useEffect(() => {
    setColumns(buildColumnsWithWidths(initialColumns || [], selectableRows));
  }, [initialColumns, selectableRows]);

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (clearSelectedRows) setSelectedRows([]);
  }, [clearSelectedRows]);

  const [sortKey, setSortKey] = useState(defaultSortKey || null);
  const [sortDirection, setSortDirection] = useState(
    defaultSortKey ? defaultSortDirection : null
  );
  const [resizingIndex, setResizingIndex] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const tableRef = useRef(null);

  const handleSort = (key, sortable) => {
    if (!sortable) return;

    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortKey(null);
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey || !sortDirection) return 0;

    // find column definition if exists
    const colDef = columns.find((c) => c.key === sortKey) || {};

    // if column provides a custom sortFunction, use it
    if (typeof colDef.sortFunction === 'function') {
      const result = colDef.sortFunction(a, b);
      return sortDirection === 'asc' ? result : -result;
    }

    const getComparable = (row, key) => {
      let val = row ? row[key] : undefined;

      // Special-case: if sorting by 'ip', prefer IPCOUNT when available
      if (key === 'ip' && row && row.IPCOUNT !== undefined && row.IPCOUNT !== null) {
        const v = Number(row.IPCOUNT);
        return Number.isFinite(v) ? v : 0;
      }

      // created_at should be compared as timestamp
      if (key === 'created_at' && val) {
        const t = Date.parse(val);
        return Number.isFinite(t) ? t : 0;
      }

      if (val === undefined || val === null) return '';

      // numeric strings -> number
      if (typeof val === 'string') {
        const num = Number(String(val).replace(/,/g, '').trim());
        if (!Number.isNaN(num) && String(val).trim() !== '') {
          return num;
        }
        return val.toLowerCase();
      }

      return val;
    };

    const aVal = getComparable(a, sortKey);
    const bVal = getComparable(b, sortKey);

    // both numbers -> numeric compare
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      if (aVal === bVal) return 0;
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }

    // fallback to localeCompare for strings
    const aStr = aVal === undefined || aVal === null ? '' : String(aVal);
    const bStr = bVal === undefined || bVal === null ? '' : String(bVal);
    const cmp = aStr.localeCompare(bStr, undefined, { numeric: true, sensitivity: 'base' });
    return sortDirection === 'asc' ? cmp : -cmp;
  });

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, sortedData.length);
  const paginatedData = sortedData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage, sortKey, sortDirection]);

  const handleMouseDown = (index, e) => {
    e.preventDefault();
    setResizingIndex(index);
    setStartX(e.clientX);
    setStartWidth(columns[index].width || 150);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (resizingIndex === null) return;

      const diff = e.clientX - startX;
      const newWidth = Math.max(
        columns[resizingIndex].minWidth || 80,
        startWidth + diff
      );

      setColumns((prev) => {
        const updated = prev.map((col, idx) =>
          idx === resizingIndex ? { ...col, width: newWidth } : col
        );
        // Save to localStorage
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(updated.map(({ width }) => ({ width }))));
        } catch {}
        return updated;
      });
    };

    const handleMouseUp = () => {
      setResizingIndex(null);
    };

    if (resizingIndex !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingIndex, startX, startWidth, columns, storageKey]);

  const getSortIcon = (key, sortable) => {
    if (!sortable) return null;

    if (sortKey !== key) {
      return <span className="btl-tbl-sort-icon">⇅</span>;
    }

    return sortDirection === 'asc' ? (
      <span className="btl-tbl-sort-icon btl-tbl-sort-active">▲</span>
    ) : (
      <span className="btl-tbl-sort-icon btl-tbl-sort-active">▼</span>
    );
  };

  const allSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row) => selectedRows.includes(row[selectedRowKey]));

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const pageRowIds = paginatedData.map((row) => row[selectedRowKey]);
      const newSelected = [...new Set([...selectedRows, ...pageRowIds])];
      setSelectedRows(newSelected);
      onSelectedRowsChange &&
        onSelectedRowsChange({
          selectedRows: sortedData.filter((r) => newSelected.includes(r[selectedRowKey])),
        });
    } else {
      const pageRowIds = paginatedData.map((row) => row[selectedRowKey]);
      const newSelected = selectedRows.filter((id) => !pageRowIds.includes(id));
      setSelectedRows(newSelected);
      onSelectedRowsChange &&
        onSelectedRowsChange({
          selectedRows: sortedData.filter((r) => newSelected.includes(r[selectedRowKey])),
        });
    }
  };

  const handleSelectRow = (row, checked) => {
    let newSelected;
    if (checked) {
      newSelected = [...selectedRows, row[selectedRowKey]];
    } else {
      newSelected = selectedRows.filter((id) => id !== row[selectedRowKey]);
    }
    setSelectedRows(newSelected);
    onSelectedRowsChange &&
      onSelectedRowsChange({
        selectedRows: sortedData.filter((r) => newSelected.includes(r[selectedRowKey])),
      });
  };
    // If loading, show skeleton loader and don't render table rows
  if (loading) {
    return (
      <div className="btl-tbl-container" ref={tableRef}>
        <div className="btl-tbl-wrapper">
          <TableLoader />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="btl-tbl-container" ref={tableRef}>
        <div className="btl-tbl-wrapper">
          <table className="btl-tbl-table">
            <thead className="btl-tbl-thead">
              <tr className="btl-tbl-header-row">
                {columns.map((column, index) => (
                  <th
                    key={column.key}
                    className={`btl-tbl-th ${column.sortable ? 'btl-tbl-sortable' : ''}`}
                    style={{ width: `${column.width}px` }}
                    onClick={() => column.key !== '__checkbox__' && handleSort(column.key, column.sortable || false)}
                  >
                    <div className="btl-tbl-th-content">
                      {column.key === '__checkbox__' ? (
                        <input
                          type="checkbox"
                          checked={allSelected}
                          onChange={handleSelectAll}
                          aria-label="Select all rows"
                        />
                      ) : (
                        <>
                          <span className="btl-tbl-th-label">{column.label}</span>
                          {getSortIcon(column.key, column.sortable || false)}
                        </>
                      )}
                    </div>
                    {column.key !== '__checkbox__' && (
                      <div
                        className="btl-tbl-resizer"
                        onMouseDown={(e) => handleMouseDown(index, e)}
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="btl-tbl-tbody">
              {paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="btl-tbl-row">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="btl-tbl-td"
                      style={{ width: `${column.width}px` }}
                    >
                      {column.key === '__checkbox__' ? (
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row[selectedRowKey])}
                          onChange={(e) => handleSelectRow(row, e.target.checked)}
                          aria-label="Select row"
                        />
                      ) : customCellRender[column.key] ? (
                        customCellRender[column.key](row)
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        {enablePagination && (
          <div className="btl-tbl-pagination">
            <div className="btl-tbl-pagination-left">
              <label htmlFor="rows-per-page" className="btl-tbl-pagination-label">
                Rows per page:
              </label>
              <select
                id="rows-per-page"
                className="btl-tbl-pagination-select"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
                <option value={500}>500</option>
              </select>
            </div>

            <div className="btl-tbl-pagination-center">
              <span className="btl-tbl-pagination-info">
                {sortedData.length === 0
                  ? '0 of 0'
                  : `${startIndex + 1}-${endIndex} of ${sortedData.length}`}
              </span>
            </div>

            <div className="btl-tbl-pagination-right">
              <button
                className="btl-tbl-pagination-btn"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                aria-label="First page"
              >
                ⏮
              </button>
              <button
                className="btl-tbl-pagination-btn"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                ◀
              </button>
              <button
                className="btl-tbl-pagination-btn"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                ▶
              </button>
              <button
                className="btl-tbl-pagination-btn"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                aria-label="Last page"
              >
                ⏭
              </button>
            </div>
          </div>
        )}
      </>
  );
}
