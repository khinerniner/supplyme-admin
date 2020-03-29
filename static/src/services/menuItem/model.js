import { parseFirestoreTimeStamp } from '../../utils/misc';

export function getMenuItemFromSnapshot(menuItem) {
    return {
        itemID: menuItem.itemID,
        fullSizeItemImageURL: menuItem.fullSizeItemImageURL,
        active: menuItem.active,
        deleted: menuItem.deleted,
        itemID: menuItem.itemID,
        skuID: menuItem.skuID,
        certID: menuItem.certID,
        brandName: menuItem.brandName,
        itemName: menuItem.itemName,
        itemType: menuItem.itemType,
        locationID: menuItem.locationID,
        notes: menuItem.notes,
        oldItemRef: menuItem.oldItemRef,
        quantities: menuItem.quantities,
        thumbItemImageURL: menuItem.thumbItemImageURL,
        updatedDate: parseFirestoreTimeStamp(menuItem.updatedDate),
        createdDate: parseFirestoreTimeStamp(menuItem.createdDate),
        availableStockPerItem: menuItem.availableStockPerItem,
        unassignedStockPerItem: menuItem.unassignedStockPerItem,
    };
}
export function toNewMenuItem() {
    return {
        itemID: null,
        fullSizeItemImageURL: null,
        active: false,
        deleted: false,
        itemID: null,
        skuID: null,
        certID: null,
        brandName: null,
        itemName: null,
        itemType: 'ppe',
        locationID: null,
        notes: null,
        oldItemRef: null,
        quantities: [],
        thumbItemImageURL: null,
        updatedDate: null,
        createdDate: null,
        availableStockPerItem: {},
        unassignedStockPerItem: {},
    };
}
export function toNewQuantity() {
    return {
        pricePerUnit: 0,
        stock: 0,
    };
}
export function menuItemRowObject(menuItem) {
    return {
        index: menuItem.itemID,
        id: menuItem.itemID,
        active: menuItem.active,
        deleted: menuItem.deleted,
        brandName: menuItem.brandName,
        skuID: menuItem.skuID,
        itemName: menuItem.itemName,
        itemType: menuItem.itemType,
        updatedDate: menuItem.updatedDate,
        createdDate: menuItem.createdDate,
    };
}
