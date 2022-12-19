package com.haheeho.adblock.member;

import java.util.List;

public class Members {
	private List<Member> members;
	
	public Members() {
		// TODO Auto-generated constructor stub
	}

	public Members(List<Member> member) {
		super();
		this.members = member;
	}

	public List<Member> getMember() {
		return members;
	}

	public void setMember(List<Member> member) {
		this.members = member;
	}
	
	
	
}