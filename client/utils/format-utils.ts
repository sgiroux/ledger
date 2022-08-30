class FormatUtils {
  static formatCurrency(currencyCode: string, currency: number) {
    return `$`;
  }

  private static currencyCodeToSymbol(currencyCode: string): string {
    switch (currencyCode) {
      default:
        return '$';
    }
  }
}

export default FormatUtils;
