package com.haheeho.adblock.board;

import java.util.List;

import com.haheeho.adblock.member.Member;

public interface BoardMapper {
	
	public abstract int boardWrite(Board b);
	public abstract BoardSequence getSequence(Board b);
	public abstract int setBoardCount(BoardSearchOption bso);
	public abstract int setBoardCountByUsername(BoardSearchOption bso);
	public abstract List<Board> getBoards(BoardSearchOption bso);
	public abstract List<Board> getBoardsByUsername(BoardSearchOption bso);
	public abstract Board getContent(BoardSequence bs);
	public abstract int modifyContent(Board b);
	public abstract int deleteContent(BoardSequence bs);
	public abstract List<Board> getBoardsByID(Member m);
}
