
const formatMoney = (money) => {
    if (money) {
        const rs = money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        return rs;
    }
    return 0;
  
}

export {
    formatMoney
}