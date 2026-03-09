import "@tanstack/react-table"

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    onView?: (row: TData) => void
    onEdit?: (row: TData) => void
    onDelete?: (row: TData) => void
    shouldDisable?: (row: TData) => boolean
  }
}
