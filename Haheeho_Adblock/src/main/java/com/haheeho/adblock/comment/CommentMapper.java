package com.haheeho.adblock.comment;

import java.util.List;

public interface CommentMapper {
	public abstract int commentSave(Comment c);
	public abstract int commentModify(Comment c);
	public abstract int commentDelete(Comment c);
	public abstract List<Comment> commentGet(Comment c);
	public abstract List<Comment> commentGetByID(Comment c);
}
