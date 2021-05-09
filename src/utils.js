export default function fomatCurrency(num) {
    return `$${Number(num.toFixed(1).toLocaleString())} `;
}