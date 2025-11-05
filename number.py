from pdfminer.high_level import extract_text
import re
import os

def extract_invoice_number(pdf_path):
    """从 PDF 中提取发票号码（电子发票、火车票等）"""
    try:
        text = extract_text(pdf_path)
        if not text:
            return None

        # 定义可能的发票号码前缀关键词
        keywords = ["发票号码", "票号", "流水号"]
        for kw in keywords:
            # 匹配数字序列（16-20 位）紧跟关键词
            pattern = rf"{kw}\s*[:：]?\s*(\d{{16,20}})"
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(1)

        return None
    except Exception as e:
        print(f"❌ 无法解析 {pdf_path}: {e}")
        return None

if __name__ == "__main__":
    folder = "/Users/lorne/Downloads/2025-10 发票/个人发票/"    # 存放电子发票的文件夹
    pdf_files = [f for f in os.listdir(folder) if f.lower().endswith(".pdf")]

    invoice_numbers = []
    for pdf in pdf_files:
        path = os.path.join(folder, pdf)
        number = extract_invoice_number(path)
        invoice_numbers.append(number)
        print(f"{pdf}: 发票号码 = {number or '未识别'}")

    # 检查重复
    seen = set()
    duplicates = set()
    for num in invoice_numbers:
        if num in seen:
            duplicates.add(num)
        elif num:  # 过滤 None
            seen.add(num)

    if duplicates:
        print("\n⚠️ 发现重复发票号码：")
        for d in duplicates:
            print(d)
    else:
        print("\n✅ 未发现重复发票号码")
