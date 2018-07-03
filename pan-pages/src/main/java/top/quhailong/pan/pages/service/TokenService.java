package top.quhailong.pan.pages.service;

import top.quhailong.pan.utils.PanResult;

public interface TokenService {
	PanResult getUserByToken(String token);
	boolean exists(String prefix,String key);
}
