'use client';
import React, { memo } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CardPaginationProps {
  page: number;
  totalPages: number;
  onClick: (page: number) => void;
  limit?: number;
  onLimitChange?: (limit: number) => void;
  pageSizeOptions?: number[];
}

function CardPagination({
  page,
  totalPages,
  onClick,
  limit,
  onLimitChange,
  pageSizeOptions = [5, 10],
}: CardPaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const delta = 2;
    const left = Math.max(2, page - delta);
    const right = Math.min(totalPages - 1, page + delta);

    pages.push(1);

    if (left > 2) {
      pages.push('ellipsis');
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) {
      pages.push('ellipsis');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handleClick = (p: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (p !== page) onClick(p);
  };

  return (
    <CardFooter
      className={`flex items-center ${
        limit && onLimitChange ? 'justify-between' : 'justify-center'
      }`}
    >
      {limit && onLimitChange && (
        <div className="w-1/2 flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows per page:</span>

          <Select value={String(limit)} onValueChange={(val) => onLimitChange(Number(val))}>
            <SelectTrigger className="w-[80px] h-8">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {pageSizeOptions.map((val) => (
                <SelectItem key={val} value={String(val)}>
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <div className={`${limit && onLimitChange ? 'w-1/2 flex justify-end' : ''}`}>
        <Pagination>
          <PaginationContent>
            {page != 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={(e) => handleClick(Math.max(1, page - 1), e)} />
              </PaginationItem>
            )}

            {getPageNumbers().map((p, index) => (
              <PaginationItem key={index}>
                {p === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={(e) => handleClick(p, e)}
                    className={page == p ? 'bg-secondary' : ''}
                  >
                    {p}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {page != totalPages && (
              <PaginationItem>
                <PaginationNext onClick={(e) => handleClick(Math.min(totalPages, page + 1), e)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </CardFooter>
  );
}

export default memo(CardPagination);
