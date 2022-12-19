package com.haheeho.adblock.member;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MemberController {

	@Autowired
	private MemberDAO mDAO;
	
	
	@RequestMapping(value="/member.info.update", method=RequestMethod.GET)
	public String getMemberInfo(HttpServletRequest req) {
		req.setAttribute("searchBar", "main/search.jsp");
		if(mDAO.isLoggedIn(req)) {
			mDAO.getMemberInfo(req);
			req.setAttribute("contentPage", "member/info.jsp");
		}
		return "index";
	}
	
	@RequestMapping(value="/member.delete", method=RequestMethod.GET)
	public String memberDelete(Member m, HttpServletRequest req) {
		req.setAttribute("searchBar", "main/search.jsp");
		if(mDAO.isLoggedIn(req)) {
			mDAO.delete(req);
			mDAO.logout(req);
			mDAO.isLoggedIn(req);
		}
		req.setAttribute("contentPage", "main/main.jsp");
		return "index";
	}
	
	@RequestMapping(value = "/member.join.go", method = RequestMethod.GET)
	public String memberJoinGo(HttpServletRequest req) {
		req.setAttribute("searchBar", "main/search.jsp");
		req.setAttribute("contentPage", "member/join.jsp");
		req.setAttribute("loginPage", "member/login.jsp");	
		req.setAttribute("userPage", "member/emptyUserPage.jsp");
		return "index";
	}
	
	@RequestMapping(value = "/member.join.do", method = RequestMethod.POST)
	public String memberJoinDo(Member m, HttpServletRequest req) {
		mDAO.join(m, req);
		req.setAttribute("searchBar", "main/search.jsp");
		req.setAttribute("contentPage", "main/main.jsp");
		req.setAttribute("loginPage", "member/login.jsp");	
		req.setAttribute("userPage", "member/emptyUserPage.jsp");
		return "index";
	}

	@RequestMapping(value="/member.login", method=RequestMethod.POST)
	public String memberLoginDo(Member m, HttpServletRequest req) {
		mDAO.login(m, req);
		mDAO.isLoggedIn(req);
		req.setAttribute("searchBar", "main/search.jsp");
		req.setAttribute("contentPage", "main/main.jsp");
		return "index";
	}
	
	
	@RequestMapping(value="/member.logout", method=RequestMethod.GET)
	public String memberLogout(HttpServletRequest req) {
		mDAO.logout(req);
		mDAO.isLoggedIn(req);
		req.setAttribute("searchBar", "main/search.jsp");
		req.setAttribute("contentPage", "main/main.jsp");
		return "index";
	}
	
	@RequestMapping(value="/member.info.get", method=RequestMethod.GET, produces="application/json; charset=utf-8")
	public @ResponseBody Members memberInfoGet(Member m) {
		
		return mDAO.getMemberInfo(m);
	}
	
	@RequestMapping(value="/member.update.do", method=RequestMethod.POST)
	public String memberUpdate(Member m, HttpServletRequest req) {
		if(mDAO.isLoggedIn(req)) {
			mDAO.update(m, req);
			mDAO.getMemberInfo(req);
			req.setAttribute("contentPage", "member/info.jsp");
		} else {
			req.setAttribute("contentPage", "main/main.jsp");
		}
		req.setAttribute("searchBar", "main/search.jsp");
		return "index";
	}
}