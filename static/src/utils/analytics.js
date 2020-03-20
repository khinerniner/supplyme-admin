export function generalAnalytic(userId, event, eventCategory) {
    console.log(eventCategory);
    return gtag(
        'event', event, {
            event_category: eventCategory,
        },
    );
}

export function privalgoAnalytic(event, parameters) {
    return gtag(
        'event', event, {
            parameters: parameters,
        },
    );
}
