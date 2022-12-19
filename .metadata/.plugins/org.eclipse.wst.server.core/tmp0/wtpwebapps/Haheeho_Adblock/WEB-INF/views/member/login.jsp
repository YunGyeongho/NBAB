<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form action="member.login" method="post" name="memberLoginForm" onsubmit="return memberLoginCheck();">
		<table class="loginInputTable">
			<tr>
				<td>
					ID
				</td>
				<td>
					<input id="loginID" name="m_id" maxlength="12">
				</td>
			</tr>
			<tr>
				<td>
					PW
				</td>
				<td>
					<input id="loginPW" type="password" name="m_pw" maxlength="20">
				</td>
			</tr>
			<tr>
				<td align="center">
					<a href="member.join.go">Sign up</a>
				</td>
				<td align="right">
					<button>Login</button>
				</td>
			</tr>
		</table>
	</form>
</body>
</html>