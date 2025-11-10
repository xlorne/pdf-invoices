from pypdf import PdfReader, PdfWriter, Transformation
import os

def create_nup_pdf(
    input_pdf_path,
    output_pdf_path,
    grid=(2, 2),        # (列数, 行数)，例如 (3, 3) = 每页9个
    margin=20,          # 页边距
    content_margin=5,   # 裁剪留白边距
    rotate=90           # 是否旋转每页（90或0）
):
    """
    通用 N-up PDF 生成器：支持任意布局、自动裁剪白边、自动放大。
    """
    reader = PdfReader(input_pdf_path)
    writer = PdfWriter()

    # 页面尺寸 (A4)
    page_width, page_height = 595.28, 841.89
    cols, rows = grid
    cell_width = page_width / cols
    cell_height = page_height / rows

    for i in range(0, len(reader.pages), cols * rows):
        output_page = writer.add_blank_page(width=page_width, height=page_height)

        for j in range(cols * rows):
            page_index = i + j
            if page_index >= len(reader.pages):
                break

            src_page = reader.pages[page_index]

            # ===== ① 获取内容区域 (裁掉白边) =====
            cb = src_page.cropbox
            left = float(cb.left) + content_margin
            bottom = float(cb.bottom) + content_margin
            right = float(cb.right) - content_margin
            top = float(cb.top) - content_margin
            content_w = right - left
            content_h = top - bottom

            # ===== ② 旋转后宽高 =====
            if rotate == 90:
                rotated_w, rotated_h = content_h, content_w
            else:
                rotated_w, rotated_h = content_w, content_h

            # ===== ③ 缩放比（独立计算每页填满格子） =====
            scale = min(
                (cell_width - 2 * margin) / rotated_w,
                (cell_height - 2 * margin) / rotated_h
            )
            new_w, new_h = rotated_w * scale, rotated_h * scale

            # ===== ④ 计算位置（列×行） =====
            col = j % cols
            row = j // cols
            x = col * cell_width + (cell_width - new_w) / 2
            y = (rows - 1 - row) * cell_height + (cell_height - new_h) / 2

            # ===== ⑤ 变换矩阵：裁剪 + 旋转 + 缩放 + 平移 =====
            transform = (
                Transformation()
                .translate(-left - content_w / 2, -bottom - content_h / 2)
                .rotate(rotate)
                .scale(scale)
                .translate(x + new_w / 2, y + new_h / 2)
            )

            output_page.merge_transformed_page(src_page, transform)

    with open(output_pdf_path, "wb") as f:
        writer.write(f)

    print(f"✅ PDF {cols}x{rows} 合并完成：{output_pdf_path}")


def print_nup_pdf(
    input_file,
    output_file,
):
    # ✅ 自定义不同布局：
    configs = [
        ((2, 2), output_file),
    ]

    for grid, out_name in configs:
        if os.path.exists(input_file):
            create_nup_pdf(
                input_pdf_path=input_file,
                output_pdf_path=out_name,
                grid=grid,
                margin=10,
                content_margin=5,
                rotate=90
            )
        else:
            print(f"❌ 输入文件 {input_file} 不存在！")

# ==== 示例调用 ====
if __name__ == "__main__":
    print_nup_pdf(input_file="/Users/lorne/developer/github/python/pdf-invoices/server/all_invoices.pdf",output_file="print_output.pdf" )
