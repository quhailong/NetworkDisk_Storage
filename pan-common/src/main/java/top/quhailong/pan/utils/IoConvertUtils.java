package top.quhailong.pan.utils;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * 流转换工具
 * @Author: weibao@Loyalone.cn
 * @Date: 2019/6/14 13:55
 * @Version 1.0
 */
public class IoConvertUtils {

    /**
     * InputStream 转字节数组
     * @param input
     * @return
     */
    public static byte[] InputStream2ByteArray(InputStream input){
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        byte[] buffer = new byte[4096];
        int n = 0;
        try {
            while (-1 != (n = input.read(buffer))) {
                output.write(buffer, 0, n);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return output.toByteArray();
    }

    /**
     * 流转字符串
     * @param is
     * @return
     * @throws IOException
     */
    public static String  stream2String(InputStream is) throws IOException {
        StringBuilder str = new StringBuilder();
        BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        String line=null;
        while ((line=reader.readLine())!=null) {
            str.append(line);
        }
        return str.toString();
    }

    /**
     * 字符串转流
     * @param src
     * @return
     */
    public static InputStream string2InputStream(String src){
        return new ByteArrayInputStream(src.getBytes());
    }

    /**
     * 下载远程文件资源文件到本地
     * @param remoteFilePath
     * @param localFilePath
     */
    public static void downloadFile(String remoteFilePath, String localFilePath)
    {
        URL urlfile = null;
        HttpURLConnection httpUrl = null;
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        File f = new File(localFilePath);
        try
        {
            urlfile = new URL(remoteFilePath);
            httpUrl = (HttpURLConnection)urlfile.openConnection();
            httpUrl.connect();
            bis = new BufferedInputStream(httpUrl.getInputStream());
            bos = new BufferedOutputStream(new FileOutputStream(f));
            int len = 2048;
            byte[] b = new byte[len];
            while ((len = bis.read(b)) != -1)
            {
                bos.write(b, 0, len);
            }
            bos.flush();
            bis.close();
            httpUrl.disconnect();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        finally
        {
            try
            {
                bis.close();
                bos.close();
            }
            catch (IOException e)
            {
                e.printStackTrace();
            }
        }
    }

}
