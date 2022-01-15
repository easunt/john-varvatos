
export function isEmpty (data) {
    if (typeof (data) === 'object') {
        if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') {
            return true;
        } else if (!data) {
            return true;
        }
        return false;
    } else if (typeof (data) === 'string') {
        if (!data.trim()) {
            return true;
        }
        return false;
    } else if (typeof (data) === 'number') {
        return false;
    } else if (typeof (data) === 'undefined') {
        return true;
    } else if (isNaN(data) === true) { // 신규 NaN 처리
        return true;
    } else if (data === 0) { // 신규 0 처리
        return true;
    } else {
        return false;
    }
}
