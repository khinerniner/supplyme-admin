

function base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

export default function configureSignal() {
    window.addEventListener('load', () => {
        const _pubKey = localStorage.getItem('pubKey');
        const _signedPubKey = localStorage.getItem('signedPubKey');
        if (!_pubKey || !_signedPubKey) {
            console.warn('Generating Encryption Keys')
            var KeyHelper = libsignal.KeyHelper;

            var registrationId = KeyHelper.generateRegistrationId();
            var keyId = 123456

            KeyHelper.generateIdentityKeyPair().then((identityKeyPair) => {
                KeyHelper.generatePreKey(keyId).then((preKey) => {
                    const basePubKey = arrayBufferToBase64(preKey.keyPair.pubKey);
                    localStorage.setItem('pubKey', basePubKey);
                    const basePrivKey = arrayBufferToBase64(preKey.keyPair.privKey);
                    localStorage.setItem('privKey', basePrivKey);
                });

                KeyHelper.generateSignedPreKey(identityKeyPair, keyId).then((signedPreKey)=> {
                    const baseSignedPubKey = arrayBufferToBase64(signedPreKey.keyPair.pubKey);
                    localStorage.setItem('signedPubKey', baseSignedPubKey);
                    const baseSignedPrivKey = arrayBufferToBase64(signedPreKey.keyPair.privKey);
                    localStorage.setItem('signedPrivKey', baseSignedPrivKey);
                });
            });
        }
  });
}
