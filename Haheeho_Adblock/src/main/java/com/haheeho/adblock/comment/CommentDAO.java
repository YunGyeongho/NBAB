package com.haheeho.adblock.comment;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.haheeho.adblock.board.BoardResponseResult;

@Service
public class CommentDAO {
	
	@Autowired
	private SqlSession ss;
	
	public BoardResponseResult commentSave(Comment c) {
		try {
			if(ss.getMapper(CommentMapper.class).commentSave(c) == 1) {
				
				return new BoardResponseResult("댓글작성 성공");
			} else {
				return new BoardResponseResult("댓글작성 실패");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return new BoardResponseResult("댓글작성 실패");
		}
		
	}
	
	public BoardResponseResult commentModify(Comment c) {
		try {
			if(ss.getMapper(CommentMapper.class).commentModify(c) == 1) {
				
				return new BoardResponseResult("댓글수정 성공");
			} else {
				return new BoardResponseResult("댓글수정 실패");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return new BoardResponseResult("댓글수정 실패");
		}
		
	}
	
	public BoardResponseResult commentDelete(Comment c) {
		try {
			if(ss.getMapper(CommentMapper.class).commentDelete(c) == 1) {
				
				return new BoardResponseResult("댓글삭제 성공");
			} else {
				return new BoardResponseResult("댓글삭제 실패");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return new BoardResponseResult("댓글삭제 실패");
		}
		
	}
	
	public Comments commentGet(Comment c) {
		try {
			List<Comment> commentList = ss.getMapper(CommentMapper.class).commentGet(c);
			Comments comments = new Comments(commentList);
			return comments;
		} catch (Exception e) {
			e.printStackTrace();
			return new Comments();
		}
	}
	
	public Comments commentGetByID(Comment c) {
		try {
			List<Comment> commentList = ss.getMapper(CommentMapper.class).commentGetByID(c);
			Comments comments = new Comments(commentList);
			return comments;
		} catch (Exception e) {
			e.printStackTrace();
			return new Comments();
		}
	}
	
}
