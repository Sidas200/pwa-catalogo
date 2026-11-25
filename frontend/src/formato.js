const moneda = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });
export const precio = (n) => moneda.format(n);
