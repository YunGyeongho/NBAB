function viewComment(postNumber) {
	
		$("#commentButton").attr({"onclick":"closeComment(" + postNumber + ")"});

		$("#commentArea").css("opacity", "1");
		$("#commentArea").css("left", "-280px");
		
		
		$("#commentInputBtn").attr({"onclick":"saveComment("+ postNumber +")"})
		
		getComment(postNumber);
}

function closeComment(postNumber) {
	
	$("#commentButton").attr({"onclick":"viewComment(" + postNumber + ")"});
	
	$("#commentArea").css("left", "0px");
	$("#commentArea").css("opacity", "0");
}

let commentWorkFinish = true;

function saveComment(postNumber) {
	
	if (commentWorkFinish) {
		
		let commentInput = document.getElementById("commentInput");
		
		if (commentInput.value != "") {

			commentWorkFinish = false;

			const memberID = document.getElementById("loginID").innerText;
			const memberUsername = document.getElementById("loginUserName").innerText;
			const content = document.getElementById("commentInput").value;
			const boardTitle = document.getElementById("contentTitleTd").innerText;
			
			const query = "comment.save?c_b_number=" + postNumber + "&c_m_id=" + memberID
			+ "&c_m_username=" + memberUsername + "&c_content=" + content +
			"&c_b_title=" + boardTitle ;
			
			$.getJSON(query, (end) => {
				commentWorkFinish = true;
				commentInput.value = "";
				getComment(postNumber);
			});
			
		}else{
			alert("글을 입력해 주세요");
		}
		
	} else {
		alert("아직 DB로딩 중입니다.");
	}
}


function getComment(postNumber) {
	
	$("#showCommentArea").empty();
	
	const query = "comment.get?c_b_number=" + postNumber;
	
	$.getJSON(query, (result) => {
		
		$.each(result.comments, (n, item) => {

			const commentNumber = item.c_number;
			
			const username = item.c_m_username;
			
			const usernameTd = $("<td></td>").text(username);
			
			const date = item.c_date;
			const date2 = new Date(date);
			
			const year = date2.getFullYear(); // 4자리 => 2자리
			const month = date2.getMonth() + 1;
			const day = date2.getDate();
			const hour = date2.getHours();
			const minute = date2.getMinutes();
			
			const date3 = year + ". " + month + ". " + day + 
			" " + hour + ":" + minute;
			
			let dateTd = $("<td></td>").text(date3).attr({"align": "right"});
			const td2Tr = $("<tr></tr>").append(usernameTd, dateTd);
			
			const memberID = document.getElementById("loginID").innerText;
			const commentID = item.c_m_id;

			const content = item.c_content;

			if(memberID == commentID){
				let contentTd = $("<td></td>").attr({"colspan": "2"});
				let contentText = $("<textarea></textarea>").text(content);
				contentText.attr({"id":"commentText" + commentNumber});
				contentTd.append(contentText);
				
				let contentTr = $("<tr></tr>").append(contentTd);
				
				let modifyAndDeleteTd = $("<td></td>").attr({"colspan": "2"});
				
				const commentModify = $("<button></button>").text("수정");
				commentModify.attr({"onclick":"modifyComment("+ commentNumber +")"})
				const commentDelete = $("<button></button>").text("삭제");
				commentDelete.attr({"onclick":"deleteComment("+ commentNumber +"," + postNumber +")"})
				
				modifyAndDeleteTd.append(commentModify, "&nbsp;&nbsp;&nbsp;", commentDelete);
				modifyAndDeleteTd.attr({"align":"right"});
				
				let modifyAndDeleteTr = $("<tr></tr>").append(modifyAndDeleteTd);
				
				const commentTable = $("<table></table>").append(td2Tr, contentTr, modifyAndDeleteTr);
				commentTable.attr({"class":"bCTable"});
				$("#showCommentArea").append(commentTable);
			}else{
				let contentTd = $("<td></td>").text(content).attr({"colspan": "2", "class":"bCcontentTd"});
				let contentTr = $("<tr></tr>").append(contentTd);

				const commentTable = $("<table></table>").append(td2Tr, contentTr);
				commentTable.attr({"id":"commentTable"+ commentNumber, "class":"bCTable"});
				$("#showCommentArea").append(commentTable);
			}
			
		});
	});
}




function modifyComment(commentNumber) {
	const commentText = document.getElementById("commentText" + commentNumber);
	const commentTextValue = commentText.value;
	
	const query = "comment.modify?c_number=" + commentNumber
		+ "&c_content=" + commentTextValue;
	$.getJSON(query, (end) => {
	});
		
}


function deleteComment(commentNumber, postNumber) {
	
	$("#showCommentArea").empty();
	
	const query = "comment.delete?c_number=" + commentNumber;
	$.getJSON(query, (end) => {
		getComment(postNumber);
	});
		
}