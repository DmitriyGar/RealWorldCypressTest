
export var negativeOrPositiveAmountWrapper = (amount: string, requestStatus: string, status:string = '') => {
    let sign: string
    if (requestStatus == 'rejected'||(requestStatus =='pending'&&status=='pending')) {
        sign = '+$' + amount
    } else {
        sign = '-$' + amount
    }
    return convertAmount(sign)
}

 var convertAmount = function (amount: string) {
    var strArr = amount.toString().split('')
    if (strArr.length >= 3) {
        strArr[strArr.length - 3] = strArr[strArr.length - 3] + '.'
    }
    return strArr.join('')
}