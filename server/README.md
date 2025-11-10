# 电子发票PDF处理脚本

## 使用说明

### 安装依赖
* python3.10+ 
```
 pip install -r requirements.txt
```


## 使用步骤

PS：注意修改代码中对应的pdf发票文件路径
```
input_folder = "/Users/lorne/Downloads/2025-09 发票/个人发票/"           # 存放电子发票的文件夹
```

### 发票重复检测
```
python number.py
```
### 发票金额汇总
```
python summer.py
```
### 发票文件合并
```
python margin.py
```
### 生成打印格式
```
python print.py
```