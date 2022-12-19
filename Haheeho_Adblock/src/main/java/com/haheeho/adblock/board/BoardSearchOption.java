package com.haheeho.adblock.board;

public class BoardSearchOption {
	
	private int start;
	private int end;
	private String search;
	
	public BoardSearchOption() {
		// TODO Auto-generated constructor stub
	}

	public BoardSearchOption(int start, int end, String search) {
		super();
		this.start = start;
		this.end = end;
		this.search = search;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getEnd() {
		return end;
	}

	public void setEnd(int end) {
		this.end = end;
	}

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}
}
