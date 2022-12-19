<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form action="member.join.do" method="post"
		enctype="multipart/form-data" name="memberJoinForm"
		onsubmit="return memberJoinCheck();">
		<table id="joinTbl">
			<tr>
				<td id="joinTitleTd" align="center">
					JOIN
				</td>
			</tr>
			<tr>
				<td class="joinInputInfoTd" align="left">
					아이디
				</td>
			</tr>
			<tr>
				<td align="center">
					<input id="joinID" name="m_id" placeholder="영문(+숫자)만.최소 3글자 최대 12글자" class="joinForm" maxlength="12" autofocus="autofocus" autocomplete="off">
					<div id="idCheck"></div>
				</td>
			</tr>
			<tr>
				<td class="joinInputInfoTd" align="left">
					유저네임
				</td>
			</tr>
			<tr>
				<td align="center">
					<input name="m_username" placeholder="최소 2글자 최대 10글자" class="joinForm" maxlength="10">
				</td>
			</tr>
			<tr>
				<td class="joinInputInfoTd" align="left">
					비밀번호
				</td>
			</tr>
			<tr>
				<td align="center">
					<input name="m_pw" type="password" placeholder="영문+숫자 조합.최소 5글자 최대20글자" class="joinForm" maxlength="20">
				</td>
			</tr>
			<tr>
				<td align="center">
					<input name="checkpw" type="password" placeholder="비밀번호 확인" class="joinForm" maxlength="20">
				</td>
			</tr>
			<tr>
				<td class="joinInputInfoTd" align="left">
					이메일
				</td>
			</tr>
			<tr>
				<td align="center">
					<input name="m_email" placeholder="이메일 주소" class="joinForm" maxlength="30">
				</td>
			</tr>
			<tr>
				<td class="joinInputInfoTd" align="left">
					프로필사진
				</td>
			</tr>
			<tr>
				<td align="center">
					<input id="newPhoto" name="m_photo" type="file" placeholder="프로필 사진">
				</td>
			</tr>
			<tr>
				<td id="joinSubmitTd" align="center">
					<button>Submit</button>
				</td>
			</tr>
		</table>
	</form>
</body>
</html>