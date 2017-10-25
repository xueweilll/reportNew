package com.mj.report.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

/**
 * 导入excel数据，通用类
 * 
 * @ClassName:ImportExcel.java
 * @author MJ009
 * @date 2016年7月20日
 * @Description TODO
 * 
 */
public class ImportExcel {
	public ImportExcel() {};

	private static List<String> columns;// 要解析excel中的列名
	private static int sheetNum = 0;// 要解析的sheet下标

	/**
	 *  poi读取excle
	 * @param file
	 * @return
	 */
	@SuppressWarnings("resource")
	public static String readExcel(MultipartFile file) {
		StringBuilder retJson = new StringBuilder();
		InputStream inStream = null;
		try {
			HSSFWorkbook workbook = new HSSFWorkbook(file.getInputStream());
			// 获得表
			HSSFSheet sheet = workbook.getSheetAt(sheetNum);
			// 最后一行
			int lastRowNum = sheet.getLastRowNum();
			retJson.append("[");
			//######此处要<=否则读取时会少一行数据
			for (int i = 0; i <= lastRowNum; i++) {
				// 获得行
				HSSFRow row = sheet.getRow(i);
				String rowJson = readExcelRow(row);
				retJson.append(rowJson);
				//######此处要<=否则读取时会少一行数据
				if (i <= lastRowNum - 1)
					retJson.append(",");
			}
			retJson.append("]");
		} catch (Exception e) {
			try {
				XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream());
				XSSFSheet sheet = workbook.getSheetAt(sheetNum);
				// 最后一行
				int lastRowNum = sheet.getLastRowNum();
				retJson.append("[");
				for (int i = 0; i <= lastRowNum; i++) {
					// 获得行
					XSSFRow row = sheet.getRow(i);
					String rowJson = readExcelRow(row);
					retJson.append(rowJson);
					if (i <= lastRowNum - 1)
						retJson.append(",");
				}
				retJson.append("]");
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		} finally {
			close(null, inStream);
		}
		return retJson.toString();
	}
	
	/**
	 *  poi读取excle
	 * @param file
	 * @return
	 * @throws FileNotFoundException 
	 */
	@SuppressWarnings("resource")
	public static String readExcel(File file) throws FileNotFoundException {
		StringBuilder retJson = new StringBuilder();
		 FileInputStream is = new FileInputStream(file); 
		try {
			HSSFWorkbook workbook = new HSSFWorkbook(is);
			// 获得表
			HSSFSheet sheet = workbook.getSheetAt(sheetNum);
			// 最后一行
			int lastRowNum = sheet.getLastRowNum();
			retJson.append("[");
			//######此处要<=否则读取时会少一行数据
			for (int i = 0; i <= lastRowNum; i++) {
				// 获得行
				HSSFRow row = sheet.getRow(i);
				String rowJson = readExcelRow(row);
				retJson.append(rowJson);
				//######此处要<=否则读取时会少一行数据
				if (i <= lastRowNum - 1)
					retJson.append(",");
			}
			retJson.append("]");
		} catch (Exception e) {
			try {
				XSSFWorkbook workbook = new XSSFWorkbook(is);
				XSSFSheet sheet = workbook.getSheetAt(sheetNum);
				// 最后一行
				int lastRowNum = sheet.getLastRowNum();
				retJson.append("[");
				for (int i = 0; i <= lastRowNum; i++) {
					// 获得行
					XSSFRow row = sheet.getRow(i);
					String rowJson = readExcelRow(row);
					retJson.append(rowJson);
					if (i <= lastRowNum - 1)
						retJson.append(",");
				}
				retJson.append("]");
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		} finally {
			close(null, is);
		}
		return retJson.toString();
	}

	/**
	 * 读取行值
	 * @param row
	 * @return
	 */
	private static String readExcelRow(HSSFRow row) {
		StringBuilder rowJson = new StringBuilder();
		int lastCellNum = ImportExcel.columns.size();// 最后一个单元格
		rowJson.append("{");
		for (int i = 0; i < lastCellNum; i++) {
			HSSFCell cell = row.getCell(i);
			String cellVal = readCellValue(cell);
			rowJson.append(toJsonItem(columns.get(i), cellVal));
			if (i < lastCellNum - 1)
				rowJson.append(",");
		}
		rowJson.append("}");
		return rowJson.toString();
	}

	/**
	 * 读取行值
	 * @param row
	 *（XSSFRow）  xlsx
	 */
	private static String readExcelRow(XSSFRow row) {
		StringBuilder rowJson = new StringBuilder();
		int lastCellNum = ImportExcel.columns.size();// 最后一个单元格
		rowJson.append("{");
		for (int i = 0; i < lastCellNum; i++) {
			XSSFCell cell = row.getCell(i);
			String cellVal = readCellValue(cell);
			rowJson.append(toJsonItem(columns.get(i), cellVal));
			if (i < lastCellNum - 1)
				rowJson.append(",");
		}
		rowJson.append("}");
		return rowJson.toString();
	}

	/**
	 * 读取单元格的值
	 * 根据值类型返回数据
	 * @param hssfCell
	 * @return
	 *  * （HSSFCell）  xls
	 */
	@SuppressWarnings("static-access")
	private static String readCellValue(HSSFCell hssfCell) {
//		if (hssfCell.getCellType() == hssfCell.CELL_TYPE_BOOLEAN) {
//			return String.valueOf(hssfCell.getBooleanCellValue());
//		} else if (hssfCell.getCellType() == hssfCell.CELL_TYPE_NUMERIC) {
//			return String.valueOf(hssfCell.getNumericCellValue());
//		} else {
//			return String.valueOf(hssfCell.getRichStringCellValue());
//		}
		//导入时，统一作为字符串处理
		if(null == hssfCell){
	        return String.valueOf("--");
		}else{
			hssfCell.setCellType(hssfCell.CELL_TYPE_STRING);
	        return String.valueOf(hssfCell.getStringCellValue());
		}
	}

	/**
	 * 读取单元格的值
	 * 
	 * @param hssfCell
	 * @return
	 * * （XSSFCell）  xlsx
	 * 根据值类型返回数据
	 */
	@SuppressWarnings("static-access")
	private static String readCellValue(XSSFCell hssfCell) {
//		if (hssfCell.getCellType() == hssfCell.CELL_TYPE_BOOLEAN) {
//			return String.valueOf(hssfCell.getBooleanCellValue());
//		} else if (hssfCell.getCellType() == hssfCell.CELL_TYPE_NUMERIC) {
//			return String.valueOf(hssfCell.getNumericCellValue());
//		} else {
//			return String.valueOf(hssfCell.getRichStringCellValue());
//		}
		//导入时，统一作为字符串处理
		if(null == hssfCell){
	        return String.valueOf("--");
		}else{
			hssfCell.setCellType(hssfCell.CELL_TYPE_STRING);
	        return String.valueOf(hssfCell.getStringCellValue());
		}
	}

	/**
	 * 转换为json对
	 * 
	 * @return
	 */
	private static String toJsonItem(String name, String val) {
		return "\"" + name + "\":\"" + val + "\"";
	}

	/**
	 * 关闭io流
	 * 
	 * @param fos
	 * @param fis
	 */
	private static void close(OutputStream out, InputStream in) {
		if (in != null) {
			try {
				in.close();
			} catch (IOException e) {
				System.out.println("InputStream关闭失败");
				e.printStackTrace();
			}
		}
		if (out != null) {
			try {
				out.close();
			} catch (IOException e) {
				System.out.println("OutputStream关闭失败");
				e.printStackTrace();
			}
		}
	}

	public static List<String> getColumns() {
		return ImportExcel.columns;
	}

	public static void setColumns(List<String> columns) {
		ImportExcel.columns = columns;
	}

	public static int getSheetNum() {
		return sheetNum;
	}

	public static void setSheetNum(int sheetNum) {
		ImportExcel.sheetNum = sheetNum;
	}
}
