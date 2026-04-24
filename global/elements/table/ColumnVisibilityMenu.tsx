import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SlidersHorizontal } from 'lucide-react';

interface Column {
  key: string;
  label: string;
}

interface ColumnVisibilityMenuProps {
  allColumns: Column[];
  visibleColumns: string[];
  toggleColumn: (key: string) => void;
}

const ColumnVisibilityMenu = ({
  allColumns,
  visibleColumns,
  toggleColumn,
}: ColumnVisibilityMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <span>View</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {allColumns.map((col) => (
          <DropdownMenuCheckboxItem
            key={col.key as string}
            checked={visibleColumns.includes(col.key as string)}
            onCheckedChange={() => toggleColumn(col.key as string)}
          >
            {col.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnVisibilityMenu;
