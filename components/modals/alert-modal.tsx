'use client'

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useEffect, useState } from "react";


interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {
    const [isMounted, setIsMountend] = useState(false)

    useEffect(() => {
        setIsMountend(true)
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <Modal
            title="Вы уверены?"
            description="Это действие нельзя будет отменить."
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Отменить
                </Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                    Продолжить
                </Button>
            </div>
        </Modal>
    )
}