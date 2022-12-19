package com.haheeho.adblock.member;

public class Member {
	
	private String m_id;
	private String m_username;
	private String m_pw;
	private String m_email;
	private String m_photo;
	
	public Member() {
		// good
	}

	public Member(String m_id, String m_username, String m_pw, String m_email, String m_photo) {
		super();
		this.m_id = m_id;
		this.m_username = m_username;
		this.m_pw = m_pw;
		this.m_email = m_email;
		this.m_photo = m_photo;
	}

	public String getM_id() {
		return m_id;
	}

	public void setM_id(String m_id) {
		this.m_id = m_id;
	}

	public String getM_username() {
		return m_username;
	}

	public void setM_username(String m_username) {
		this.m_username = m_username;
	}

	public String getM_pw() {
		return m_pw;
	}

	public void setM_pw(String m_pw) {
		this.m_pw = m_pw;
	}

	public String getM_email() {
		return m_email;
	}

	public void setM_email(String m_email) {
		this.m_email = m_email;
	}

	public String getM_photo() {
		return m_photo;
	}

	public void setM_photo(String m_photo) {
		this.m_photo = m_photo;
	}
	
	
	
}
