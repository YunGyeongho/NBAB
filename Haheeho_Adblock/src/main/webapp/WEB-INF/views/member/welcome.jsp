<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<table class="loginInputTable">
		<tr>
			<td align="center">
				환영합니다<br>
				${sessionScope.loginStatus.m_username }님
			</td>
			<td id="memberImgTd" align="center">
				 <img src="resources/profileImg/${sessionScope.loginStatus.m_photo }">
			</td>
		</tr>
		<tr>
			<td align="center">
				<a href="member.info.update">정보 수정</a>
			</td>
			<td align="center">
				<a href="member.logout">로그아웃</a>
			</td>
		</tr>
	</table>
</body>
</html>