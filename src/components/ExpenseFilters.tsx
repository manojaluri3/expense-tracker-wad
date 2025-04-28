
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ExpenseFilters as FiltersType } from "@/types";
import { format } from "date-fns";
import { categories } from "@/utils/expense-utils";
import { cn } from "@/lib/utils";
import { CalendarIcon, FilterIcon } from "lucide-react";

interface ExpenseFiltersProps {
  onFilterChange: (filters: FiltersType) => void;
}

export default function ExpenseFilters({ onFilterChange }: ExpenseFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersType>({
    dateRange: {
      from: undefined,
      to: undefined,
    },
    category: "",
    amountRange: {
      min: "",
      max: "",
    },
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = (field: string, value: any) => {
    setFilters((prev) => {
      if (field === "dateRange") {
        return { ...prev, dateRange: value };
      } else if (field.startsWith("amount")) {
        const key = field.split(".")[1] as "min" | "max";
        return {
          ...prev,
          amountRange: { ...prev.amountRange, [key]: value },
        };
      } else {
        return { ...prev, [field]: value };
      }
    });
  };

  const clearFilters = () => {
    setFilters({
      dateRange: {
        from: undefined,
        to: undefined,
      },
      category: "",
      amountRange: {
        min: "",
        max: "",
      },
    });
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2>Filters</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsOpen(!isOpen)}
          className="flex gap-2"
        >
          <FilterIcon size={16} />
          {isOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Date Range</Label>
            <div className="flex flex-col space-y-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !filters.dateRange.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange.from ? (
                      format(filters.dateRange.from, "PPP")
                    ) : (
                      <span>From date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dateRange.from}
                    onSelect={(date) =>
                      handleFilterChange("dateRange", {
                        ...filters.dateRange,
                        from: date,
                      })
                    }
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !filters.dateRange.to && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange.to ? (
                      format(filters.dateRange.to, "PPP")
                    ) : (
                      <span>To date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dateRange.to}
                    onSelect={(date) =>
                      handleFilterChange("dateRange", {
                        ...filters.dateRange,
                        to: date,
                      })
                    }
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={filters.category}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Min Amount</Label>
            <Input
              type="number"
              placeholder="Min amount"
              value={filters.amountRange.min}
              onChange={(e) =>
                handleFilterChange("amount.min", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Max Amount</Label>
            <Input
              type="number"
              placeholder="Max amount"
              value={filters.amountRange.max}
              onChange={(e) =>
                handleFilterChange("amount.max", e.target.value)
              }
            />
          </div>

          <div className="md:col-span-2 lg:col-span-4 flex justify-end">
            <Button variant="ghost" onClick={clearFilters} className="ml-2">
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
