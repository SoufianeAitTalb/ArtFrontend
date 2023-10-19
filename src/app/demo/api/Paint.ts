export interface Paint {

    paintId?: bigint;
    materials?:string;
    xDimension?: number;
    yDimension?: number;
    descPaint?: string;
    descArtist?: string;
    artistId?: number;

    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    category?: string;
    image?: string;
    rating?: number;
}


interface InventoryStatus {
    label: string;
    value: string;
}
