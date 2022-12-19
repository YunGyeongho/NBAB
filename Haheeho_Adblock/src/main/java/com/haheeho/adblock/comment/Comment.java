package com.haheeho.adblock.comment;

import java.util.Date;

public class Comment {
	private int c_number;
	private int c_b_number;
	private String c_b_title;
	private String c_m_id;
	private String c_m_username;
	private Date c_date;
	private String c_content;
	
	public Comment() {
		// TODO Auto-generated constructor stub
	}

	public Comment(int c_number, int c_b_number, String c_b_title, String c_m_id, String c_m_username, Date c_date,
			String c_content) {
		super();
		this.c_number = c_number;
		this.c_b_number = c_b_number;
		this.c_b_title = c_b_title;
		this.c_m_id = c_m_id;
		this.c_m_username = c_m_username;
		this.c_date = c_date;
		this.c_content = c_content;
	}

	public int getC_number() {
		return c_number;
	}

	public void setC_number(int c_number) {
		this.c_number = c_number;
	}

	public int getC_b_number() {
		return c_b_number;
	}

	public void setC_b_number(int c_b_number) {
		this.c_b_number = c_b_number;
	}

	public String getC_b_title() {
		return c_b_title;
	}

	public void setC_b_title(String c_b_title) {
		this.c_b_title = c_b_title;
	}

	public String getC_m_id() {
		return c_m_id;
	}

	public void setC_m_id(String c_m_id) {
		this.c_m_id = c_m_id;
	}

	public String getC_m_username() {
		return c_m_username;
	}

	public void setC_m_username(String c_m_username) {
		this.c_m_username = c_m_username;
	}

	public Date getC_date() {
		return c_date;
	}

	public void setC_date(Date c_date) {
		this.c_date = c_date;
	}

	public String getC_content() {
		return c_content;
	}

	public void setC_content(String c_content) {
		this.c_content = c_content;
	}
	
}
