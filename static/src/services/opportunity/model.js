import { parseFirestoreTimeStamp } from '../../utils/misc';
import { toNewLocation } from '../../services/location/model';
import { toNewRequest } from '../../services/request/model';
import { toNewMenuItem } from '../../services/menuItem/model';

export function getOpportunityFromSnapshot(opportunity) {
    return {
        opportunityID: opportunity.opportunityID,
        active: opportunity.active,
        deleted: opportunity.deleted,
        status: opportunity.status,
        request: opportunity.request,
        transactions: opportunity.transactions,
        total: opportunity.total,
    };
}
export function toNewOpportunity() {
    return {
        opportunityID: null,
        active: false,
        deleted: false,
        status: {
            isStatus: 0,
            isStatusTime: null,
            events: [],
        },
        request: toNewRequest(),
        transactions: [],
        total: 0,
    };
}
export function toNewOpportunityItem() {
    return {
        amount: 0,
        item: toNewMenuItem(),
    };
}
export function opportunityRowObject(opportunity) {
    return {
        index: opportunity.opportunityID,
        id: opportunity.opportunityID,
        active: opportunity.active,
        deleted: opportunity.deleted,
        isStatus: opportunity.status.isStatus,
        updatedDate: parseFirestoreTimeStamp(opportunity.status.isStatusTime),
    };
}
