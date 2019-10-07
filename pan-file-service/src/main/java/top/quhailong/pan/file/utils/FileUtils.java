package top.quhailong.pan.file.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import top.quhailong.pan.pojo.FastDFSFile;

import java.io.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * 文件工具类
 *
 * @author: quhailong
 * @date: 2019/9/25
 */
@Component
public class FileUtils {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 保存文件到FastDFS中
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    public String saveFile(MultipartFile multipartFile) throws IOException {
        String[] fileAbsolutePath = {};
        String fileName = multipartFile.getOriginalFilename();
        String ext = fileName.substring(fileName.lastIndexOf(".") + 1);
        byte[] file_buff = null;
        InputStream inputStream = multipartFile.getInputStream();
        if (inputStream != null) {
            int len1 = inputStream.available();
            file_buff = new byte[len1];
            inputStream.read(file_buff);
        }
        inputStream.close();
        FastDFSFile file = new FastDFSFile(fileName, file_buff, ext);
        try {
            fileAbsolutePath = FastDFSClient.upload(file); // upload to fastdfs
        } catch (Exception e) {
            logger.error("upload file Exception!", e);
        }
        if (fileAbsolutePath == null) {
            logger.error("upload file failed,please upload again!");
        }
        // String path=FastDFSClient.getTrackerUrl()+fileAbsolutePath[0]+
        // "/"+fileAbsolutePath[1];
        return fileAbsolutePath[0] + "/" + fileAbsolutePath[1];
    }

    /**
     * 压缩文件
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    public void zipFile(File inputFile, ZipOutputStream zipoutputStream) {
        try {
            if (inputFile.exists()) { // 判断文件是否存在
                if (inputFile.isFile()) { // 判断是否属于文件，还是文件夹

                    // 创建输入流读取文件
                    FileInputStream fis = new FileInputStream(inputFile);
                    BufferedInputStream bis = new BufferedInputStream(fis);

                    // 将文件写入zip内，即将文件进行打包
                    ZipEntry ze = new ZipEntry(inputFile.getName()); // 获取文件名
                    zipoutputStream.putNextEntry(ze);

                    // 写入文件的方法，同上
                    byte[] b = new byte[1024];
                    long l = 0;
                    while (l < inputFile.length()) {
                        int j = bis.read(b, 0, 1024);
                        l += j;
                        zipoutputStream.write(b, 0, j);
                    }
                    // 关闭输入输出流
                    bis.close();
                    fis.close();
                } else { // 如果是文件夹，则使用穷举的方法获取文件，写入zip
                    try {
                        File[] files = inputFile.listFiles();
                        for (int i = 0; i < files.length; i++) {
                            zipFile(files[i], zipoutputStream);
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 删除临时文件
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    public static boolean delAllFile(String path) {
        boolean flag = false;
        File file = new File(path);
        if (!file.exists()) {
            return flag;
        }
        if (!file.isDirectory()) {
            return flag;
        }
        String[] tempList = file.list();
        File temp = null;
        for (int i = 0; i < tempList.length; i++) {
            if (path.endsWith(File.separator)) {
                temp = new File(path + tempList[i]);
            } else {
                temp = new File(path + File.separator + tempList[i]);
            }
            if (temp.isFile()) {
                temp.delete();
            }
            if (temp.isDirectory()) {
                delAllFile(path + "/" + tempList[i]);// 先删除文件夹里面的文件
                delFolder(path + "/" + tempList[i]);// 再删除空文件夹
                flag = true;
            }
        }
        return flag;
    }

    /**
     * 删除文件夹
     *
     * @author: quhailong
     * @date: 2019/9/25
     */
    public static void delFolder(String folderPath) {
        try {
            delAllFile(folderPath); //删除完里面所有内容
            String filePath = folderPath;
            filePath = filePath.toString();
            java.io.File myFilePath = new java.io.File(filePath);
            myFilePath.delete(); //删除空文件夹
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
