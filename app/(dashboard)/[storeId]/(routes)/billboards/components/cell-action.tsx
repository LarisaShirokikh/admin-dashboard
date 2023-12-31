"use client"

import axios from 'axios'
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuLabel, 
    DropdownMenuTrigger,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { BillboardColumn } from "./columns"
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from 'react-hot-toast';
import { AlertModal } from '@/components/modals/alert-modal';


interface CellActionProps {
    data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onConfirm = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
            toast.success('Billboards deleted.');
            router.refresh();
        } catch (error) {
            toast.error('Make sure you removed all categories using this billboard first');
        } finally {
            setOpen(false);
            setLoading(false);

        }
    }

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('Billboard ID copied to clipboard.');
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Открыть меню</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => onCopy(data.id)}
                    >
                        <Copy className="mr-2 h-4 w-4" /> Скопировать
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Обновить
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="mr-2 h-4 w-4" /> Удалить
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
