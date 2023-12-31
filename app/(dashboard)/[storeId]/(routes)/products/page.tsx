
import prismadb from '@/lib/prismadb'
import { ProductClient } from './components/client'
import { format } from 'date-fns';
import { formatter } from '@/lib/utils';
import { ProductColumn } from './components/columns';

const ProductPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const product = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            color: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedProduct: ProductColumn[] = product.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()),
        category: item.category.name,
        color: item.color.value,
        createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ProductClient data={formattedProduct} />
            </div>
        </div>
    )
}

export default ProductPage