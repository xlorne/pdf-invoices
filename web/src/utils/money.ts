export function numberToChineseRMB(num: number | string): string {
    // 验证输入
    if (typeof num === 'string') {
      num = parseFloat(num);
    }
    if (isNaN(num) || num < 0 || num > 999999999999.99) {
      throw new Error('金额必须为 0 到 999999999999.99 之间的数字');
    }
  
    const integerPart = Math.floor(num);
    const decimalPart = Math.round((num - integerPart) * 100);
  
    const chineseDigits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const chineseUnits = ['', '拾', '佰', '仟'];
    const chineseBigUnits = ['', '万', '亿'];
  
    // 转换整数部分
    function convertInteger(n: number): string {
      if (n === 0) return '';
      let result = '';
      let unitIndex = 0;
      let zeroFlag = false;
    
      while (n > 0) {
        const digit = n % 10;
        if (digit === 0) {
          // 仅当前面还有数字时才标记要加零
          if (result !== '') zeroFlag = true;
        } else {
          if (zeroFlag) {
            result = '零' + result;
            zeroFlag = false;
          }
          result = chineseDigits[digit] + chineseUnits[unitIndex] + result;
        }
        unitIndex++;
        n = Math.floor(n / 10);
      }
    
      return result;
    }
  
    // 按万/亿分段处理整数
    function convertFullInteger(n: number): string {
      if (n === 0) return '零';
      let parts = [];
      let i = 0;
      while (n > 0) {
        const segment = n % 10000;
        const segStr = convertInteger(segment);
        if (segStr !== '' || parts.length === 0) {
          if (segStr === '' && parts.length > 0) {
            // 避免连续零，如“一亿零万”
          } else {
            parts.unshift(segStr + (segment > 0 ? chineseBigUnits[i] : ''));
          }
        }
        n = Math.floor(n / 10000);
        i++;
      }
      return parts.join('');
    }
  
    // 转换小数部分（角分）
    function convertDecimal(d: number): string {
      if (d === 0) return '整';
      let result = '';
      const jiao = Math.floor(d / 10);
      const fen = d % 10;
      if (jiao > 0) {
        result += chineseDigits[jiao] + '角';
      } else if (fen > 0 && integerPart > 0) {
        result += '零';
      }
      if (fen > 0) {
        result += chineseDigits[fen] + '分';
      }
      return result;
    }
  
    const integerStr = convertFullInteger(integerPart);
    const decimalStr = convertDecimal(decimalPart);
  
    // 组合结果
    let final = integerStr + '元' + decimalStr;
  
    // 处理“元整”、“零元”等边界情况
    if (integerPart === 0 && decimalPart > 0) {
      final = '零元' + decimalStr;
    }
  
    return final;
  }

