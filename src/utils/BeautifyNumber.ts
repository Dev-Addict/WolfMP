const BeautifyNumber = (number: number): string => number < 10 ? '0' + number : number.toString();

export default BeautifyNumber;
