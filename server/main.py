import os
from fastapi import FastAPI
from fastapi.openapi.models import Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from summer import summer
from number import number_check
from margin import merge_pdfs
from print import print_nup_pdf

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