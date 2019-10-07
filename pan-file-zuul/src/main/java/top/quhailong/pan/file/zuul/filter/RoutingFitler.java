package top.quhailong.pan.file.zuul.filter;

import com.netflix.zuul.ZuulFilter;

public class RoutingFitler extends ZuulFilter {

	@Override
	public Object run() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean shouldFilter() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public int filterOrder() {
		return 0;
	}

	@Override
	public String filterType() {
		// TODO Auto-generated method stub
		return "routing";
	}

}
