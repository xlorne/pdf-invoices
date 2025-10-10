import os
from PyPDF2 import PdfMerger

def merge_pdfs(input_folder, output_file):
    merger = PdfMerger()

    # 获取文件夹中所有 PDF 文件（按文件名排序）
    pdf_files = sorted(
        [f for f in os.listdir(input_folder) if f.lower().endswith('.pdf')]
    )

    if not pdf_files:
        print("❌ 未找到任何 PDF 文件。")
        return

    print(f"🔍 找到 {len(pdf_files)} 个 PDF 文件，开始合并...")

    for pdf in pdf_files:
        file_path = os.path.join(input_folder, pdf)
        merger.append(file_path)
        print(f"✅ 已添加: {pdf}")

    # 输出合并结果
    merger.write(output_file)
    merger.close()
    print(f"\n🎉 合并完成！输出文件: {output_file}")

if __name__ == "__main__":
    # === 你可以修改下面这两行 ===
    input_folder = "/Users/lorne/Downloads/2025-09 发票/个人发票/"           # 存放电子发票的文件夹
    output_file = "./all_invoices.pdf"  # 合并后的输出文件名

    merge_pdfs(input_folder, output_file)

