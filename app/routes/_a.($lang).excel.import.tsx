import { useState } from "react";

// xlsx
import * as XLSX from "xlsx";
import ExportJsonExcel from 'js-export-excel';

import { Button, message, Table, Upload } from "antd";

const Dragger = Upload.Dragger;

const Preview = () => {
  const [tableData, setTableData] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);
  const [data, setData] = useState({});

  const uploadFilesChange = (file: any) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const { result } = event.target as any;
        const workbook = XLSX.read(result, { type: "binary" });
        let newData: any = {
          sg_input_rules: [],
        };

        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            newData[sheet] = newData[sheet].concat(
              XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            );
          }
        }

        setData(newData.sg_input_rules);
        message.success("上传成功！");
      } catch (e) {
        message.error("文件类型不正确！");
      }
    };
    fileReader.readAsBinaryString(file.file);
  };

  const downloadFileToExcel = () => {
    let dataTable: any = [];
    let option: any = {};
    dataTable = data;
    option.fileName = '下载文档';
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: '安全组',
        sheetFilter: ['规则协议', '端口', '来源', '策略', '备注', '修改时间'],
        sheetHeader: ['规则协议', '端口', '来源', '策略', '备注', '修改时间'],
      }
    ];
    let toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  };

  return (
    <div>
      <Dragger
        name="file"
        beforeUpload={() => false}
        onChange={uploadFilesChange}
        showUploadList={false}
      >
        <p className="ant-upload-text">
          <span>点击上传文件</span>
          或者拖拽上传
        </p>
      </Dragger>
      <Button
        type="primary"
        onClick={downloadFileToExcel}
        style={{ marginBottom: "15px" }}
      >
        下载
      </Button>
      <Table
        columns={tableHeader}
        dataSource={tableData}
      />
    </div>
  );
};

export default Preview;
