import { parseFirestoreTimeStamp } from '../../utils/misc';


/*
Quantites

Linear Measure

in
ft
yd
rd
fur
mi
league
statute
nauticalMile

Area Measure

sqft
sqyd
sqrd
acre
sqmi
section
township

Cubic Measure

cuft
cuyd

Liquid Measure

gill
pint
quart
gallog

Avoirdupois Weight

grain
dr: dram
oz
lb
cwt: hunderedweight
ton
grosscwt: gross hunderedweight

Other
ea: Each

*/

/*

Package Type
piece
weight

*/

export function getMenuItemFromSnapshot(menuItem) {
    return {
        itemID: menuItem.itemID,
        fullSizeItemImageURL: menuItem.fullSizeItemImageURL,
        active: menuItem.active,
        deleted: menuItem.deleted,
        itemID: menuItem.itemID,
        upcID: menuItem.upcID,
        brandName: menuItem.brandName,
        // tagLine: menuItem.tagLine,
        // manufacturerName: menuItem.manufacturerName,
        itemName: menuItem.itemName,
        itemType: menuItem.itemType,
        locationID: menuItem.locationID,
        description: menuItem.description,
        oldItemRef: menuItem.oldItemRef,
        quantities: menuItem.quantities,
        // measurement: menuItem.measurement,
        // lwd: menuItem.lwd,
        thumbItemImageURL: menuItem.thumbItemImageURL,
        updatedDate: parseFirestoreTimeStamp(menuItem.updatedDate),
        createdDate: parseFirestoreTimeStamp(menuItem.createdDate),
        availableStockPerItem: menuItem.availableStockPerItem,
        unassignedStockPerItem: menuItem.unassignedStockPerItem,
        // supplies: menuItem.supplies,
        // supportingDocs: menuItem.supportingDocs,
        // isFinished: menuItem.isFinished,
        // private: menuItem.private,
        // warningLabel: menuItem.warningLabel,
        madeInCountry: menuItem.madeInCountry,
    };
}
export function toNewMenuItem() {
    return {
        itemID: null,
        fullSizeItemImageURL: null,
        active: false,
        deleted: false,
        itemID: null,
        upcID: null,
        brandName: null,
        // tagLiacturerName: null,
        itemName: null,
        itemType: 'ppe',
        locationID: null,
        description: null,
        oldItemRef: null,
        quantities: [],
        // measurement: {
        //     label: null,
        //     units: 0,
        // },
        // lwd: {
        //     length: 0,
        //     width: 0,
        //     depth: 0,
        // },
        thumbItemImageURL: null,
        updatedDate: null,
        createdDate: null,
        availableStockPerItem: {},
        unassignedStockPerItem: {},
        // supplies: [],
        // supportingDocs: [],
        // isFinished: false,
        // private: false,
        // warningLabel: null,
        madeInCountry: 'USA',
    };
}
export function toNewQuantity() {
    return {
        packageQuantity: 1,
        packageType: 'piece',
        weightType: 'oz',
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
        upcID: menuItem.upcID,
        itemName: menuItem.itemName,
        itemType: menuItem.itemType,
        madeInCountry: menuItem.madeInCountry,
        updatedDate: menuItem.updatedDate,
        createdDate: menuItem.createdDate,
    };
}
