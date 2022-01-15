


export function attributeFormCreate(sendAttribute){

    if (sendAttribute.supported !== undefined) {
        if (sendAttribute.supported.indexOf(',') === -1) {
            const strSupported = sendAttribute.supported;
            sendAttribute.supported = [];
            sendAttribute.supported[0] = strSupported;

        } else {
            sendAttribute.supported = sendAttribute.supported.split(',')
        }
    }
    if (sendAttribute.writable !== undefined) {
        if (sendAttribute.writable.indexOf(',') === -1) {
            const strWritable = sendAttribute.writable;
            sendAttribute.writable = [];
            sendAttribute.writable[0] = strWritable;

        } else {
            sendAttribute.writable = sendAttribute.writable.split(',')
        }
    }

    return sendAttribute
    
}

