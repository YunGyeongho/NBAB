package com.haheeho.adblock.member;

import java.util.List;

public interface MemberMapper {
	public abstract int join(Member m);
	public abstract Member getMemberByID(Member m);
	public abstract List<Member> getMembersByID(Member m);
	public abstract int updateMemberInfo(Member m);
	public abstract int deleteMember(Member m);
}