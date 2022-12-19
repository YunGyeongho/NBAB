const likeInfoGetURL = "http://sdgn-djvemfu.tplinkdns.com:6776/like.info.get"

function loadUserPage() {
	if (document.location.href.indexOf("board") != -1){
		userPageBoard();
	} else {
		userPageLike();
	}
}

// Like & Memo 이벤트
	
function userPageLike() {
	
	whereUserPage = "like";
	userPageLikeLoad();
}
	
function userPageLikeLoad() {
	
	const memberID = document.getElementById("loginID").innerText;
	
	$.getJSON(likeInfoGetURL + "?memberID=" + memberID, (result) => {
		
		$("#userPageScrollDiv").empty();
		
		$.each(result.info , (n, i) => {
			const url = i.u_url;
			const title = i.u_title;
			const label = i.u_label;
			const memo = i.u_memo;
			const heartPushed = i.u_like;
			
			const labelTd = $("<td></td>").text(label);
			labelTd.attr({"id":"labelLikeUserPage" + n, 'colspan':"2", "align":"center", "class":"uPLabelTd"});
			
			let labelImg = $("<img>");
			if (label == "광고 기재"){
				labelImg.attr({'src':'resources/img/red.PNG', "class":"photo", "style":"margin-left:25px;"});
			} else if (label == "광고 확률 높음"){
				labelImg.attr({'src':'resources/img/yellow.PNG', "class":"photo"});
			} else if (label == "광고 확률 낮음"){
				labelImg.attr({'src':'resources/img/green.PNG', "class":"photo"});
			} else {
				labelImg.attr({'src':'resources/img/ready.PNG', "class":"photo"});
			}
			labelTd.append(labelImg);
			
			var labelTr = $("<tr></tr>").append(labelTd);
			
			var titleTd = $("<td></td>").attr({'colspan':"2", "class":"uPTitleTd"});
			var titleLink = $("<a></a>").attr({'href':url, 'target':'_blank'}).text(title);
			titleLink.attr({"id":"likeUserPageTitle" + n});
			titleTd.append(titleLink);
			
			var titleTr = $("<tr></tr>").append(titleTd);
			
			var likeMemoTd = $("<td></td>").attr({"align":"right"});
			
			let likeImg = $("<img>")
			if (heartPushed) {
				likeImg.attr({"src": "resources/img/fullHeart.PNG", "class":"uPImg"});
				likeImg.attr({"onclick":"clickLikeDownButtonLikeUserPage(" + n + ")"});
			} else {
				likeImg.attr({"src": "resources/img/emptyHeart.PNG", "class":"uPImg"});
				likeImg.attr({"onclick":"clickLikeUpButtonLikeUserPage(" + n + ")"});
			}

			likeImg.attr({"id": "likeImgLikeUserPage" + n});
			let memoImg = $("<img>").attr({"onclick":"clickMemoButtonLikeUserPage(" + n + ")"});
			memoImg.attr({"id":"memoButtonLikeUserPage" + n});
			if (memo == "") {
				memoImg.attr({"src": "resources/img/closeMemo.png", "class":"uPImg"});
			}else{
				memoImg.attr({"src": "resources/img/closeMemoRed.png", "class":"uPImg"});
			}
			likeMemoTd.append(memoImg, likeImg);

			let memoContent = $("<textarea></textarea>").text(memo);
			memoContent.attr({"id": "memoLikeUserPage" + n});
			memoContent.attr({"style": "display : none;"});

			let memoTd = $("<td></td>").attr({"align":"center"});
			memoTd.append(memoContent);
			
			var likeMemoTr = $("<tr></tr>").append(memoTd,likeMemoTd);
			
			
			var logTable = $("<table></table>").append(labelTr, titleTr, likeMemoTr);
			logTable.attr({"id": "userPageLikeTable" + n, "class":"logTable"});
			
			$("#userPageScrollDiv").append(logTable);
			
		});
		
	});
}

// Post 이벤트

function userPageBoard() {
	whereUserPage = "post";
	userPageBoardLoad();
}
	

function userPageBoardLoad() {
	const memberID = document.getElementById("loginID").innerText;
	$("#userPageScrollDiv").empty();
	
	$.getJSON("board.info.get?m_id=" + memberID, (result) => {
		
		
		$.each(result.boards, (n, i) => {
			
			const title = i.b_title;
			const date = i.b_date;
			const postNum = i.b_number;
			
			var date2 = new Date(date);
			var year = date2.getFullYear();
			var month = date2.getMonth() + 1;
			var day = date2.getDate();
			
			var date3 = year + "년" + month + "월" + day + "일"
			var dateTd = $("<td></td>").text(date3);
			dateTd.attr({"align":"center"});
			
			var postGo = $("<a></a>").text(title).attr({"href" : "board.show.content?b_number=" + postNum})
			var titleTd = $("<td></td>").append(postGo);
			titleTd.attr({"align":"center", "class":"uPPTitleTd"});
			
			var titleTr = $("<tr></tr>").append(titleTd);
			var dateTr = $("<tr></tr>").append(dateTd);
			
			var boardTable = $("<table></table>").append(dateTr, titleTr);
			boardTable.attr({"class":"logTable"});
			
			$("#userPageScrollDiv").append(boardTable);
			
		});
		
	});
}

// Reply 이벤트

function userPageComment() {
	
	whereUserPage = "comment";
	userPageCommentLoad();
}

function userPageCommentLoad() {
	
	const memberID = document.getElementById("loginID").innerText;
	
	const query = "comment.get.byID?c_m_id=" + memberID;
	
	$.getJSON(query, (result) => {
		
		$("#userPageScrollDiv").empty();
		
		$.each(result.comments , (n, i) => {

			const title = i.c_b_title;
			const postNum = i.c_b_number;
			
			let titleTd = $("<td></td>").attr({"align": "center"});
			const postGo = $("<a></a>").text(title).attr({"href" : "board.show.content?b_number=" + postNum})
			titleTd.append(postGo);
			let titleTr = $("<tr></tr>").append(titleTd);
			
			const date = i.c_date;
			const date2 = new Date(date);
			
			const month = date2.getMonth() + 1;
			const day = date2.getDate();
			const hour = date2.getHours();
			const minute = date2.getMinutes();
			
			const date3 = month + ". " + day + 
			" " + hour + ":" + minute;
			
			let dateTd = $("<td></td>").text(date3).attr({"align": "right"});
			let dateTr = $("<tr></tr>").append(dateTd);
			
			const content = i.c_content;
			let contentTd = $("<td></td>").text(content);
			contentTd.attr({"align": "center", "class":"uPCContentTd"});
			let contentTr = $("<tr></tr>").append(contentTd);
			
			const logTable = $("<table></table>").append(titleTr, contentTr, dateTr);
			logTable.attr({"class":"logTable"});
			$("#userPageScrollDiv").append(logTable);

		});
	});
	
}
