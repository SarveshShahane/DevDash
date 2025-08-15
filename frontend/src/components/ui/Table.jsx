import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Table = ({ 
    data = [], 
    columns = [], 
    className = "",
    rowClassName = "",
    headerClassName = "",
    emptyMessage = "No data available",
    isLoading = false,
    onRowClick = null,
    sortable = false,
    striped = true,
    hoverable = true,
    bordered = true
}) => {
    if (isLoading) {
        return (
            <div className={`border border-gray-700 rounded-xl bg-gray-800/40 ${className}`}>
                <div className="p-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-12 bg-gray-700 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (!data || data.length === 0) {
        return (
            <div className={`border border-gray-700 rounded-xl bg-gray-800/40 ${className}`}>
                <div className="text-center py-12">
                    <div className="text-gray-400 text-lg">{emptyMessage}</div>
                </div>
            </div>
        )
    }

    return (
        <div className={`border border-gray-700 rounded-xl bg-gray-800/40 backdrop-blur-sm overflow-hidden ${className}`}>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className={`border-b border-gray-700 bg-gray-800/60 ${headerClassName}`}>
                            {columns.map((column, index) => (
                                <th 
                                    key={index}
                                    className={`px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider ${column.className || ''}`}
                                    style={{ width: column.width }}
                                >
                                    <div className="flex items-center gap-2">
                                        {column.icon && column.icon}
                                        {column.header}
                                        {sortable && column.sortable && (
                                            <button className="ml-1 text-gray-400 hover:text-white">
                                                ↕️
                                            </button>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={`${bordered ? 'divide-y divide-gray-700/50' : ''}`}>
                        <AnimatePresence>
                            {data.map((row, rowIndex) => (
                                <motion.tr 
                                    key={row.id || rowIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2, delay: rowIndex * 0.02 }}
                                    className={`
                                        ${hoverable ? 'hover:bg-gray-700/30 transition-all duration-200' : ''}
                                        ${striped && rowIndex % 2 === 1 ? 'bg-gray-800/20' : ''}
                                        ${onRowClick ? 'cursor-pointer' : ''}
                                        ${rowClassName}
                                    `}
                                    onClick={() => onRowClick && onRowClick(row)}
                                >
                                    {columns.map((column, colIndex) => (
                                        <td 
                                            key={colIndex}
                                            className={`px-6 py-4 ${column.cellClassName || ''}`}
                                        >
                                            {column.render 
                                                ? column.render(row[column.key], row, rowIndex)
                                                : row[column.key]
                                            }
                                        </td>
                                    ))}
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const DataTable = (props) => (
    <Table 
        {...props}
        striped={true}
        hoverable={true}
        bordered={true}
        className={`shadow-lg ${props.className || ''}`}
    />
)

export const SimpleTable = (props) => (
    <Table 
        {...props}
        striped={false}
        hoverable={true}
        bordered={false}
        className={`border-0 bg-transparent ${props.className || ''}`}
    />
)

export const CompactTable = (props) => (
    <Table 
        {...props}
        className={`text-sm ${props.className || ''}`}
        rowClassName="py-2"
    />
)

export default Table
