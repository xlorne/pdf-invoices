from pdfminer.high_level import extract_text
import re
import os

def extract_amount_from_pdf(pdf_path):
    """从 PDF 中提取金额（支持电子发票、铁路票）"""
    try:
        text = extract_text(pdf_path)
        # print(pdf_path + '------------------------->')
        # print(text)

        # 匹配金额
        patterns = [
            r"￥\s*([\d,]+\.\d{2})",   # 火车票的提取
            r"[（(]小写[)）]\s*[¥￥]\s*([\d,]+\.\d{2})",  # 小写金额，兼容全角半角括号和空格/制表符
        ]
        for p in patterns:
            match = re.search(p, text.replace(" ", ""), re.IGNORECASE)
            if match:
                return match.group(1)
        return None
    except Exception as e:
        print(f"❌ 无法解析 {pdf_path}: {e}")
        return None


if __name__ == "__main__":
    folder = "/Users/lorne/Downloads/2025-09 发票/个人发票/"    # 存放电子发票的文件夹
    pdf_files = [f for f in os.listdir(folder) if f.lower().endswith(".pdf")]

    total_amount = 0.0  # 用 total_amount 更清晰
    for pdf in pdf_files:
        path = os.path.join(folder, pdf)
        amount = extract_amount_from_pdf(path)
        if amount:
            total_amount += float(amount)  # 字符串转浮点数累加
        print(f"{pdf}: 金额 = {amount or '未识别'}")

    print(f'发票总金额 = {total_amount:.2f}')