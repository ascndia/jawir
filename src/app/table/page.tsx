import { TableCase1 } from '@/registry/block/table/case-1'
import { TableCase2 } from '@/registry/block/table/case-2'
import { TableCase3 } from '@/registry/block/table/case-3'
import { TableCase4 } from '@/registry/block/table/case-4'
import { TableCase5 } from '@/registry/block/table/case-5'
import React from 'react'

function TablePage() {
  return (
    <div className="flex py-12 pb-24 w-full container mx-auto flex-col space-y-12">
        <TableCase1/>
        <TableCase2/>
        <TableCase3/>
        <TableCase4/>
        <TableCase5/>
    </div>
  )
}

export default TablePage