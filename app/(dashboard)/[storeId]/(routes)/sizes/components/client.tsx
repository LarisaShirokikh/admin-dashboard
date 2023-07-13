"use client"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import React from "react"
import { SizeColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"



interface SizeClientProps {
    data: SizeColumn[]
}



export const SizeClient: React.FC<SizeClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Size (${data.length})`}
                    description="Управление размерами в Вашем магазине"
                />
                <Button onClick={() => router.push(`/${params.storeId}/size/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Создать
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for Size" />
            <Separator />
            <ApiList entityName="Sizes" entityIdName="sizeId"/>
        </>
    )
}
