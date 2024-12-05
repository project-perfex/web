/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

interface LoadingStateProps {
  columns: any[]
}

export const LoadingState = ({ columns }: LoadingStateProps) => (
  <>
    <div className="flex items-center justify-center mb-4 text-violet-500">
      <svg
        className="animate-spin h-5 w-5 mr-3 text-violet-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        data-testid="spinner"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <p>Carregando...</p>
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index}>
              <Skeleton className="h-6 w-full" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(10)].map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column, colIndex) => (
              <TableCell key={colIndex} className="pt-2 pb-2">
                <Skeleton className="h-6 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
)
