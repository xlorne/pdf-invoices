import React from "react";
import { info, summer, check, margin, print } from "../api/pdf";
import { ReloadOutlined, PayCircleOutlined, BlockOutlined } from "@ant-design/icons";
import { Button, message, Space, Card } from "antd";

const PDFPanel = () => {
  const [pdfFolder, setPdfFolder] = React.useState("/");
  const [money, setMoney] = React.useState(0);
  const [duplicates, setDuplicates] = React.useState<string[]>([]);

  const reloadInfo = () => {
    info().then((res: any) => {
      setPdfFolder(res.data.folder);
    });
  };

  const resummary = () => {
    summer().then((res: any) => {
      setMoney(res.data.total_amount);
    });
  };

  const recheck = () => {
    check().then((res: any) => {
      setDuplicates(res.data.list);
    });
  };

  const marginPdf = () => {
    margin().then((res: any) => {
      if (res.data) {
        message.success("文件已经合并到: all_invoices.pdf 文件");
      }
    });
  };

  const printPdf = () => {
    print().then((res: any) => {
      if (res.data) {
        message.success("文件已经合并到: print_output.pdf 文件");
      }
    });
  };

  React.useEffect(() => {
    reloadInfo();
  }, []);

  return (
    <div>
      {/* 信息展示部分 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          border: "1px solid #eee",
          borderRadius: 8,
          padding: 16,
          background: "#fafafa",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
          发票信息
        </div>

        <div>
          <span style={{ color: "#112233", fontWeight: 500 }}>📂 发票文件路径：</span>
          <span style={{ marginLeft: 8, color: "#333" }}>{pdfFolder}</span>
        </div>

        <div>
          <span style={{ color: "#112233", fontWeight: 500 }}>💰 发票总金额：</span>
          <span style={{ marginLeft: 8, color: "#333" }}>{money}</span>
        </div>

        <div>
          <span style={{ color: "#112233", fontWeight: 500 }}>⚠️ 重复发票税号：</span>
          {duplicates.length === 0 ? (
            <span style={{ marginLeft: 8, color: "#52c41a" }}>不存在重复</span>
          ) : (
            <div
              style={{
                marginTop: 8,
                maxHeight: 200,
                overflowY: "auto",
                border: "1px solid #f0f0f0",
                borderRadius: 6,
                padding: 8,
                background: "#fff",
              }}
            >
              {duplicates.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "4px 8px",
                    borderBottom:
                      index !== duplicates.length - 1
                        ? "1px solid #f5f5f5"
                        : "none",
                    fontFamily: "monospace",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 操作按钮区 */}
      <div style={{ marginTop: 24 }}>
        <Space wrap>
          <Button icon={<ReloadOutlined />} onClick={reloadInfo}>
            查看路径
          </Button>

          <Button icon={<PayCircleOutlined />} onClick={resummary}>
            合集金额
          </Button>

          <Button icon={<BlockOutlined />} onClick={recheck}>
            税号检测
          </Button>

          <Button icon={<BlockOutlined />} onClick={marginPdf}>
            合并一页
          </Button>

          <Button icon={<BlockOutlined />} onClick={printPdf}>
            打印格式
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default PDFPanel;