"use client"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import React from "react"
import {  CategoryColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"



interface CategoryClientProps {
    data: CategoryColumn[]
}



export const CategoryClient: React.FC<CategoryClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Категории (${data.length})`}
                    description="Управление категориями в Вашем магазине"
                />
                <Button onClick={() => router.push(`/${params.storeId}/category/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Добавить новую
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for Categories" />
            <Separator />
            <ApiList entityName="category" entityIdName="categoryId"/>
        </>
    )
}
