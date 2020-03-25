import { parseFirestoreTimeStamp } from '../../utils/misc';

export function getMenuItemFromSnapshot(menuItem) {
    return {
        itemID: menuItem.itemID,
        fullSizeItemImageURLs: menuItem.fullSizeItemImageURLs,
        active: menuItem.active,
        deleted: menuItem.deleted,
        itemID: menuItem.itemID,
        skuID: menuItem.skuID,
        brand: menuItem.brand,
        itemName: menuItem.itemName,
        itemType: menuItem.itemType,
        locationID: menuItem.locationID,
        notes: menuItem.notes,
        oldItemRef: menuItem.oldItemRef,
        quantities: menuItem.quantities,
        thumbItemImageURLs: menuItem.thumbItemImageURLs,
        updatedDate: menuItem.updatedDate,
        createdDate: menuItem.createdDate,
        availableStockPerItem: menuItem.availableStockPerItem,
        unassignedStockPerItem: menuItem.unassignedStockPerItem,
    };
}
export function toNewMenuItem() {
    return {
        itemID: null,
        fullSizeItemImageURLs: [],
        active: false,
        deleted: false,
        itemID: null,
        skuID: null,
        brand: null,
        itemName: null,
        itemType: 'ppe',
        locationID: null,
        notes: null,
        oldItemRef: null,
        quantities: {},
        thumbItemImageURLs: [],
        updatedDate: null,
        createdDate: null,
        availableStockPerItem: {},
        unassignedStockPerItem: {},
    };
}
export function menuItemRowObject(menuItem) {
    return {
        index: menuItem.menuItemID,
        id: menuItem.menuItemID,
        active: menuItem.active,
        deleted: menuItem.deleted,
        itemName: menuItem.itemName,
        itemType: menuItem.itemType,
        updatedDate: menuItem.updatedDate,
        createdDate: menuItem.createdDate,
    };
}
