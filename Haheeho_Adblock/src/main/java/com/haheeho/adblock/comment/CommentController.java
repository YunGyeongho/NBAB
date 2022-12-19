package com.haheeho.adblock.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.haheeho.adblock.board.BoardResponseResult;

@Controller
public class CommentController {
	
	@Autowired
	private CommentDAO cDAO;
	
	@RequestMapping(value="/comment.save", method=RequestMethod.GET, produces="application/json; charset=utf-8")
	public @ResponseBody BoardResponseResult commentSave(Comment c) {
		
		return cDAO.commentSave(c);
	}

	@RequestMapping(value="/comment.get", method=RequestMethod.GET, produces="application/json; charset=utf-8")
	public @ResponseBody Comments commentGet(Comment c) {
		
		return cDAO.commentGet(c);
	}
	
	@RequestMapping(value="/comment.modify", method=RequestMethod.GET, produces="application/json; charset=utf-8")
	public @ResponseBody BoardResponseResult commentModify(Comment c) {
		
		return cDAO.commentModify(c);
	}
	
	@RequestMapping(value="/comment.delete", method=RequestMethod.GET, produces="application/json; charset=utf-8")
	public @ResponseBody BoardResponseResult commentDelete(Comment c) {
		
		return cDAO.commentDelete(c);
	}
	
	@RequestMapping(value="/comment.get.byID", method=RequestMethod.GET, produces="application/json; charset=utf-8")
	public @ResponseBody Comments commentGetByID(Comment c) {
		
		return cDAO.commentGetByID(c);
	}
}
