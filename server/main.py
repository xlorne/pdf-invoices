import os

import uvicorn
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from margin import merge_pdfs
from number import number_check
from print import print_nup_pdf
from summer import summer

static_folder = './static'
if not os.path.exists(static_folder):
    os.mkdir(static_folder)

pdf_folder = './pdfs'
if not os.path.exists(pdf_folder):
    os.mkdir(pdf_folder)

app = FastAPI()

# 获取当前文件所在目录
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 挂载静态资源目录（HTML、CSS、JS）
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static", "static")), name="static")


# 默认首页路由
@app.get("/")
async def read_index():
    return FileResponse(os.path.join(BASE_DIR, "static", "index.html"))


@app.get("/api/info")
async def info():
    return {
        "folder": pdf_folder
    }


@app.get("/api/summer")
async def pdf_summer():
    total_amount = summer(pdf_folder)
    return {
        "total_amount": '{0:.2f}'.format(total_amount),
    }


@app.get("/api/check")
async def pdf_number_check():
    list = number_check(pdf_folder)
    return {
        "list": list,
    }


@app.get("/api/margin")
async def pdf_margin():
    merge_pdfs(pdf_folder, 'all_invoices.pdf')
    return {
        "success": True,
    }


@app.get("/api/print")
async def pdf_print():
    print_nup_pdf('all_invoices.pdf', 'print_output.pdf')
    return {
        "success": True,
    }


# 启动方式：
# uvicorn main:app --reload

def run():
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)


if __name__ == '__main__':
    run()
