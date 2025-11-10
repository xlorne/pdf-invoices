import os
from fastapi import FastAPI
from fastapi.openapi.models import Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from summer import summer
from number import number_check
from margin import merge_pdfs
from print import print_nup_pdf

if not os.path.exists("./static"):
    os.mkdir('./static')

app = FastAPI()

# 获取当前文件所在目录
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 挂载静态资源目录（HTML、CSS、JS）
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")

# 默认首页路由
@app.get("/")
async def read_index():
    return FileResponse(os.path.join(BASE_DIR, "static", "index.html"))

@app.get("/hello")
async def hello_world():
    return {
        "message": "Hello World"
    }

@app.get("/summer")
async def pdf_summer(pdf_folder:str):
    total_amount = summer(pdf_folder)
    return {
        "total_amount": '{0:.2f}'.format(total_amount),
    }

@app.get("/summer")
async def pdf_summer(pdf_folder:str):
    total_amount = summer(pdf_folder)
    return {
        "total_amount": '{0:.2f}'.format(total_amount),
    }

@app.get("/check")
async def pdf_number_check(pdf_folder:str):
    list = number_check(pdf_folder)
    return {
        "list": list,
    }

@app.get("/margin")
async def pdf_margin(pdf_folder:str,output_file:str):
    merge_pdfs(pdf_folder, output_file)
    return {
        "success": True,
    }

@app.get("/print")
async def pdf_print(input_file:str,output_file:str):
    print_nup_pdf(input_file, output_file)
    return {
        "success": True,
    }

# 启动方式：
# uvicorn main:app --reload