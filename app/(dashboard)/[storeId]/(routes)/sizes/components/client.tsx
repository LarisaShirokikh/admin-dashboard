"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ApiList } from "@/components/ui/api-list"

import { SizeColumn, columns } from "./columns"



interface SizesClientProps {
    data: SizeColumn[]
}



export const SizesClient: React.FC<SizesClientProps> = ({
    data
}) => {

    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Sizes (${data.length})`}
                    description="Управление размерами в Ваших продуктах"
                />
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="mr-2 h-4 w-4" />Создать
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for Sizes" />
            <Separator />
            <ApiList entityName="sizes" entityIdName="sizeId" />
        </>
    )
}
