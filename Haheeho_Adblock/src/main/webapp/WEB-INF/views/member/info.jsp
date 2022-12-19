<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form action="member.update.do" method="post"
		enctype="multipart/form-data" name="memberUpdateForm"
		onsubmit="return memberUpdateCheck();">
		<table id="updateTbl">
			<tr>
				<td id="updateTitleTd" align="center">
					회원 정보 수정
				</td>
			</tr>
			<tr>
				<td class="updateInputInfoTd" align="left">
					아이디
				</td>
			</tr>
			<tr>
				<td align="center">
					<input id="updateID" name="m_id" value="${sessionScope.loginStatus.m_id }" class="updateForm" readonly="readonly">
				</td>
			</tr>
			<tr>
				<td class="updateInputInfoTd" align="left">
					유저네임
				</td>
			</tr>
			<tr>
				<td align="center">
					<input name="m_username" value="${sessionScope.loginStatus.m_username }" placeholder="최소 2글자 최대 10글자" class="updateForm" maxlength="10">
				</td>
			</tr>
			<tr>
				<td class="updateInputInfoTd" align="left">
					비밀번호
				</td>
			</tr>
			<tr>
				<td align="center">
					<input name="m_pw" value="${sessionScope.loginStatus.m_pw }" type="password" placeholder="영문+숫자 조합.최소 5글자 최대20글자" class="updateForm" maxlength="20">
				</td>
			</tr>
			<tr>
				<td align="center">
					<input name="checkpw" value="${sessionScope.loginStatus.m_pw }" type="password" placeholder="비밀번호 확인" class="updateForm" maxlength="20">
				</td>
			</tr>
			<tr>
				<td class="updateInputInfoTd" align="left">
					이메일
				</td>
			</tr>
			<tr>
				<td align="center">
					<input name="m_email" value="${sessionScope.loginStatus.m_email }" placeholder="이메일 주소" class="updateForm" maxlength="30">
				</td>
			</tr>
			<tr>
				<td class="updateInputInfoTd" align="left">
					프로필사진
				</td>
			</tr>
			<tr>
				<td align="center">
					<img src="resources/img/${sessionScope.loginStatus.m_photo }">
					<input id="newPhoto" name="m_photo" type="file" placeholder="프로필 사진">
				</td>
			</tr>
			<tr>
				<td id="updateSubmitTd" align="center">
					<button>정보 수정</button>
				</td>
				<td align="right"><a href="index.do">취소</a></td>
			</tr>
			<tr>
				<td></td>
				<td align="right"><a href="member.delete" style="font-size: 12pt; color: red">탈퇴</a></td>
			</tr>
		</table>
	</form>
</body>
</html>