
// Event is (action_model_result)
export function xupplyAnalytic(event, parameters) {
    return gtag(
        'event', event, {
            parameters: parameters,
        },
    );
}
