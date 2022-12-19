package com.haheeho.adblock.board;

import java.util.Date;

public class Board {
	private int b_number;
	private String b_m_id;
	private String b_m_username;
	private String b_title;
	private Date b_date;
	
	public Board() {
		// TODO Auto-generated constructor stub
	}

	public Board(int b_number, String b_m_id, String b_m_username, String b_title, Date b_date) {
		super();
		this.b_number = b_number;
		this.b_m_id = b_m_id;
		this.b_m_username = b_m_username;
		this.b_title = b_title;
		this.b_date = b_date;
	}

	public int getB_number() {
		return b_number;
	}

	public void setB_number(int b_number) {
		this.b_number = b_number;
	}

	public String getB_m_id() {
		return b_m_id;
	}

	public void setB_m_id(String b_m_id) {
		this.b_m_id = b_m_id;
	}

	public String getB_m_username() {
		return b_m_username;
	}

	public void setB_m_username(String b_m_username) {
		this.b_m_username = b_m_username;
	}

	public String getB_title() {
		return b_title;
	}

	public void setB_title(String b_title) {
		this.b_title = b_title;
	}

	public Date getB_date() {
		return b_date;
	}

	public void setB_date(Date b_date) {
		this.b_date = b_date;
	}
	
}
