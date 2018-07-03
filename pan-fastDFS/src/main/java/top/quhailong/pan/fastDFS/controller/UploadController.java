package top.quhailong.pan.fastDFS.controller;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import top.quhailong.pan.fastDFS.client.ShareClient;
import top.quhailong.pan.fastDFS.service.UploadService;
import top.quhailong.pan.fastDFS.utils.FastDFSClient;
import top.quhailong.pan.fastDFS.utils.MyRedisTemplate;
import top.quhailong.pan.pojo.FastDFSFile;
import top.quhailong.pan.utils.JsonUtils;
import top.quhailong.pan.utils.RestAPIResult;

@RestController
@RequestMapping("rest")
public class UploadController {
	private static Logger logger = LoggerFactory.getLogger(UploadController.class);
	@Autowired
	private UploadService uploadService;
	@Autowired
	private MyRedisTemplate redisTemplate;
	@Autowired
	private ShareClient shareClient;

	@RequestMapping("/uploadFile") // new annotation since 4.3
	@ResponseBody
	public RestAPIResult<String> singleFileUpload(String fid, @RequestParam("file") MultipartFile file,String uid,
			String parentPath) {
		RestAPIResult<String> panResult = new RestAPIResult<String>();
			try {
				if (parentPath != null) {
					parentPath = URLDecoder.decode(parentPath, "UTF-8");
				} else {
					parentPath = "/";
				}
				String upPath = "";
				synchronized (this) {
					// 我的资源/滴滴滴.txt
					if (file.getOriginalFilename().contains("/")) {
						upPath = file.getOriginalFilename().substring(0, file.getOriginalFilename().lastIndexOf("/"));
						if (upPath.contains("/")) {
							upPath = upPath.substring(upPath.lastIndexOf("/") + 1, upPath.length());
						}
						if (uploadService.checkDir(uid, upPath, parentPath)) {
							uploadService.createDir(upPath, uid, parentPath);
						}
					}
					String md5 = redisTemplate.get("fileMd5", fid);
					redisTemplate.deleteWithPrefix("fileMd5", fid);
					if (uploadService.md5check(md5)) {
						String[] results = uploadService.findFile(md5);
						if (parentPath.equals("/")) {
							uploadService.createVirtualAddress(results[0],uid,
									file.getOriginalFilename().substring(
											file.getOriginalFilename().lastIndexOf("/") + 1,
											file.getOriginalFilename().length()),
									md5, results[1], results[2], parentPath + upPath);
						} else {
							if (upPath.equals("")) {
								uploadService.createVirtualAddress(results[0],uid,
										file.getOriginalFilename().substring(
												file.getOriginalFilename().lastIndexOf("/") + 1,
												file.getOriginalFilename().length()),
										md5, results[1], results[2], parentPath);
							} else {
								uploadService.createVirtualAddress(results[0],uid,
										file.getOriginalFilename().substring(
												file.getOriginalFilename().lastIndexOf("/") + 1,
												file.getOriginalFilename().length()),
										md5, results[1], results[2], parentPath + "/" + upPath);
							}
						}
						panResult.success(null);
						return panResult;
					} else {
						String path = saveFile(file);
						String[] results = uploadService.createFile(file, path, md5);
						if (parentPath.equals("/")) {
							uploadService.createVirtualAddress(results[0],uid,
									file.getOriginalFilename().substring(
											file.getOriginalFilename().lastIndexOf("/") + 1,
											file.getOriginalFilename().length()),
									md5, results[1], results[2], parentPath + upPath);
						} else {
							if (upPath.equals("")) {
								uploadService.createVirtualAddress(results[0],uid,
										file.getOriginalFilename().substring(
												file.getOriginalFilename().lastIndexOf("/") + 1,
												file.getOriginalFilename().length()),
										md5, results[1], results[2], parentPath);
							} else {
								uploadService.createVirtualAddress(results[0],uid,
										file.getOriginalFilename().substring(
												file.getOriginalFilename().lastIndexOf("/") + 1,
												file.getOriginalFilename().length()),
										md5, results[1], results[2], parentPath + "/" + upPath);
							}
						}
						panResult.success(null);
						return panResult;
					}
				}

			} catch (Exception e) {
				logger.error("upload file failed", e);
				panResult.error("出现异常");
				return panResult;
			}
	}

	@RequestMapping(value = "md5check" , method = { RequestMethod.POST }) // new annotation since 4.3
	@ResponseBody
	public RestAPIResult<String> md5Check(HttpServletRequest request,String fid, String md5) {
		RestAPIResult<String> panResult = new RestAPIResult<String>();
		if (uploadService.md5check(md5)) {
			redisTemplate.setWithExpireTime("fileMd5", fid, md5, 259200);
			panResult.success(null);
			return panResult;
		} else {
			redisTemplate.setWithExpireTime("fileMd5", fid, md5, 259200);
			panResult.error();
			return panResult;
		}

	}

	@RequestMapping("/uploadFileSpe") // new annotation since 4.3
	@ResponseBody
	public RestAPIResult<String> uploadFileSpe(String fid, String fileName, String md5, String uid,
			String parentPath) {
		RestAPIResult<String> panResult = new RestAPIResult<String>();
			try {
				if (parentPath != null) {
					parentPath = URLDecoder.decode(parentPath, "UTF-8");
				} else {
					parentPath = "/";
				}
				synchronized (this) {
					String upPath = "";
					boolean isOK = true;
					String[] results = uploadService.findFile(md5);
					if (fileName.contains("/")) {
						upPath = fileName.substring(0, fileName.lastIndexOf("/"));
						if (upPath.contains("/")) {
							upPath = upPath.substring(upPath.lastIndexOf("/") + 1, upPath.length());
						}
						if (uploadService.checkDir(uid, upPath, parentPath)) {
							uploadService.createDir(upPath,uid, parentPath);
						}
						if (parentPath.equals("/")) {
							isOK = uploadService.createVirtualAddress(results[0], uid,
									fileName.substring(fileName.lastIndexOf("/") + 1, fileName.length()), md5,
									results[1], results[2], parentPath + upPath);
						} else {
							isOK = uploadService.createVirtualAddress(results[0], uid,
									fileName.substring(fileName.lastIndexOf("/") + 1, fileName.length()), md5,
									results[1], results[2], parentPath + "/" + upPath);
						}
					} else {
						isOK = uploadService.createVirtualAddress(results[0], uid, fileName, md5,
								results[1], results[2], parentPath);
					}
					if (isOK) {
						redisTemplate.deleteWithPrefix("fileMd5", fid);
						panResult.success(null);
						return panResult;
					} else {
						panResult.error("存入虚拟地址发生错误");
						return panResult;
					}
				}
			} catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException
					| IllegalArgumentException | UnsupportedEncodingException exception) {
				// TODO: handle exception
				exception.printStackTrace();
				panResult.error("用户信息无法验证");
				return panResult;
			}
	}

	@RequestMapping(value = "/download", method = RequestMethod.POST)
	public void download(HttpServletRequest request, String uid, String vids, HttpServletResponse res) {
			try {
				List<String> vid = JsonUtils.jsonToList(vids, String.class);
				String fileName2 = uploadService.fileName(vid.get(0), uid);
				Map<String, String> map = uploadService.getFids(vid, uid);
				if (map != null && map.size() == 1) {
					for (Map.Entry<String, String> entry : map.entrySet()) {
						String groupName = null;
						String remoteFileName = null;
						String fileName = entry.getKey();
						groupName = entry.getValue().substring(0, entry.getValue().indexOf("/"));
						remoteFileName = entry.getValue().substring(groupName.length() + 1, entry.getValue().length());
						InputStream inputStream = FastDFSClient.downFile(groupName, remoteFileName);
						res.setContentType("application/octet-stream");
						res.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes(), "ISO-8859-1"));
						byte[] buff = new byte[1024];
						BufferedInputStream bis = null;
						OutputStream os = null;
						try {
							os = res.getOutputStream();
							bis = new BufferedInputStream(inputStream);
							int i = bis.read(buff);
							while (i != -1) {
								os.write(buff, 0, buff.length);
								os.flush();
								i = bis.read(buff);
							}
						} catch (IOException e) {
							e.printStackTrace();
						} finally {
							if (bis != null) {
								try {
									bis.close();
								} catch (IOException e) {
									e.printStackTrace();
								}
							}
						}
					}
				} else if (map != null && map.size() > 1) {
					String folderName = UUID.randomUUID().toString().replaceAll("-", "");
					File fileDir = new File(folderName);
					fileDir.mkdir();
					String fileName3 = "【批量下载】" + fileName2.substring(0, fileName2.lastIndexOf(".")) + "等.zip";
					String zipFilePath = folderName + "/" + fileName3;
					File zip = new File(zipFilePath);
					if (!zip.exists()) {
						zip.createNewFile();
					}
					FileOutputStream fos = new FileOutputStream(zip);
					ZipOutputStream zos = new ZipOutputStream(fos);
					for (Map.Entry<String, String> entry : map.entrySet()) {
						String groupName = null;
						String remoteFileName = null;
						String fileName = entry.getKey();
						groupName = entry.getValue().substring(0, entry.getValue().indexOf("/"));
						remoteFileName = entry.getValue().substring(groupName.length() + 1, entry.getValue().length());
						InputStream inputStream = FastDFSClient.downFile(groupName, remoteFileName);
						File file = new File(folderName + "/" + fileName);
						OutputStream os = new FileOutputStream(file);
						int bytesRead = 0;
						byte[] buffer = new byte[8192];
						while ((bytesRead = inputStream.read(buffer, 0, 8192)) != -1) {
							os.write(buffer, 0, bytesRead);
						}
						os.flush();
						os.close();
						inputStream.close();
						zipFile(file, zos);
					}
					zos.closeEntry();
					zos.close();
					fos.close();
					res.setContentType("application/octet-stream");
					res.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName3.getBytes(), "ISO-8859-1"));
					byte[] buff = new byte[1024];
					BufferedInputStream bis = null;
					OutputStream os = null;
					try {
						InputStream fis = new BufferedInputStream(new FileInputStream(zipFilePath));
						os = res.getOutputStream();
						bis = new BufferedInputStream(fis);
						int i = bis.read(buff);
						while (i != -1) {
							os.write(buff, 0, buff.length);
							os.flush();
							i = bis.read(buff);
						}
					} catch (IOException e) {
						e.printStackTrace();
					} finally {
						if (bis != null) {
							try {
								bis.close();
							} catch (IOException e) {
								e.printStackTrace();
							}
						}
					}
					delFolder(folderName);
				} else {

				}

			} catch (Exception exception) {
				// TODO: handle exception
			}
	}
	
	@RequestMapping(value = "/downloadShare", method = RequestMethod.POST)
	public void downloadShare(String lockPassword,HttpServletRequest request, String shareId, HttpServletResponse res) {
			try {
				RestAPIResult<String> result = shareClient.getVinfo(shareId,lockPassword);
				if(result.getRespCode() == 1) {
					Map<String, Object> map2 = result.getRespMap();
					@SuppressWarnings("unchecked")
					List<String> vid = (List<String>) map2.get("vid");
					//List<String> vid = JsonUtils.jsonToList(vids, String.class);
					String uid = map2.get("uid").toString();
					String fileName2 = uploadService.fileName(vid.get(0), uid);
					Map<String, String> map = uploadService.getFids(vid, uid);
					shareClient.addShareDownload(shareId);
					if (map != null && map.size() == 1) {
						for (Map.Entry<String, String> entry : map.entrySet()) {
							String groupName = null;
							String remoteFileName = null;
							String fileName = entry.getKey();
							groupName = entry.getValue().substring(0, entry.getValue().indexOf("/"));
							remoteFileName = entry.getValue().substring(groupName.length() + 1, entry.getValue().length());
							InputStream inputStream = FastDFSClient.downFile(groupName, remoteFileName);
							res.setContentType("application/octet-stream");
							res.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes(), "ISO-8859-1"));
							byte[] buff = new byte[1024];
							BufferedInputStream bis = null;
							OutputStream os = null;
							try {
								os = res.getOutputStream();
								bis = new BufferedInputStream(inputStream);
								int i = bis.read(buff);
								while (i != -1) {
									os.write(buff, 0, buff.length);
									os.flush();
									i = bis.read(buff);
								}
							} catch (IOException e) {
								e.printStackTrace();
							} finally {
								if (bis != null) {
									try {
										bis.close();
									} catch (IOException e) {
										e.printStackTrace();
									}
								}
							}
						}
					} else if (map != null && map.size() > 1) {
						String folderName = UUID.randomUUID().toString().replaceAll("-", "");
						File fileDir = new File(folderName);
						fileDir.mkdir();
						String fileName3 = "【批量下载】" + fileName2.substring(0, fileName2.lastIndexOf(".")) + "等.zip";
						String zipFilePath = folderName + "/" + fileName3;
						File zip = new File(zipFilePath);
						if (!zip.exists()) {
							zip.createNewFile();
						}
						FileOutputStream fos = new FileOutputStream(zip);
						ZipOutputStream zos = new ZipOutputStream(fos);
						for (Map.Entry<String, String> entry : map.entrySet()) {
							String groupName = null;
							String remoteFileName = null;
							String fileName = entry.getKey();
							groupName = entry.getValue().substring(0, entry.getValue().indexOf("/"));
							remoteFileName = entry.getValue().substring(groupName.length() + 1, entry.getValue().length());
							InputStream inputStream = FastDFSClient.downFile(groupName, remoteFileName);
							File file = new File(folderName + "/" + fileName);
							OutputStream os = new FileOutputStream(file);
							int bytesRead = 0;
							byte[] buffer = new byte[8192];
							while ((bytesRead = inputStream.read(buffer, 0, 8192)) != -1) {
								os.write(buffer, 0, bytesRead);
							}
							os.flush();
							os.close();
							inputStream.close();
							zipFile(file, zos);
						}
						zos.closeEntry();
						zos.close();
						fos.close();
						res.setContentType("application/octet-stream");
						res.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName3.getBytes(), "ISO-8859-1"));
						byte[] buff = new byte[1024];
						BufferedInputStream bis = null;
						OutputStream os = null;
						try {
							InputStream fis = new BufferedInputStream(new FileInputStream(zipFilePath));
							os = res.getOutputStream();
							bis = new BufferedInputStream(fis);
							int i = bis.read(buff);
							while (i != -1) {
								os.write(buff, 0, buff.length);
								os.flush();
								i = bis.read(buff);
							}
						} catch (IOException e) {
							e.printStackTrace();
						} finally {
							if (bis != null) {
								try {
									bis.close();
								} catch (IOException e) {
									e.printStackTrace();
								}
							}
						}
						
						delFolder(folderName);
					} else {
						
					}
				}else {
					
				}

			} catch (Exception exception) {
				// TODO: handle exception
			}
	}

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


	/**
	 * @param multipartFile
	 * @return
	 * @throws IOException
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
}
