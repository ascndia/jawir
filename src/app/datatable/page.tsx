import { DataTableCase1 } from '@/registry/block/datatable/case-1'
import { DataTableCase2 } from '@/registry/block/datatable/case-2'
import { DataTableCase3 } from '@/registry/block/datatable/case-3'
import { DataTableCase4 } from '@/registry/block/datatable/case-4'
import { DataTableCase5 } from '@/registry/block/datatable/case-5'
import React from 'react'

function DataTablePage() {
  return (
    <div className="flex py-12 pb-24 w-full container mx-auto flex-col space-y-12">
        <DataTableCase1/>
        <DataTableCase2/>
        <DataTableCase3/>
        <DataTableCase4/>
        <DataTableCase5/>
    </div>
  )
}

export default DataTablePage