if (typeof writeButton == 'undefined'){
	let writeButton = null;
}

if (document.getElementById("m_username") != null){
	writeButton = document.getElementById('boardWriteButton');
	writeButton.addEventListener('click', () => {submitBoard()});
} else {
	writeButton = document.getElementById('boardModifyButton');
	writeButton.addEventListener('click', () => {modifyBoard()});
}

 
function submitBoard() {
	const submitNodeURL = "http://sdgn-djvemfu.tplinkdns.com:6776/board.submit"
	const b_m_id = document.getElementById('m_id').value;
	const b_m_username = document.getElementById('m_username').value;
	const b_title = document.getElementById('b_title').value;
	const b_content = document.getElementById("boardEditor").innerHTML;
	if (b_title != "" && b_content != ""){
		$.ajax({
			type: "POST",
			url: "board.write.submit",
			data: {b_m_id: b_m_id, b_m_username: b_m_username, b_title: b_title},
			success: (result) => {
				const b_number = result["b_number"];
				$.ajax({
					type: "POST",
					url: submitNodeURL,
					data: {b_number: b_number, b_content: b_content},
					success: (end) => {
						location.href= `board.show.content?b_number=${b_number}`;
					}
				});
			}
		});
	} else {
		alert("제목과 글 내용을 입력 해주세요.");
		document.getElementById('b_title').focus();
	}
} 


function modifyBoard() {
	const modifyNodeURL = "http://sdgn-djvemfu.tplinkdns.com:6776/board.modify"
	const b_title = document.getElementById('b_title').value;
	const b_content = document.getElementById("boardEditor").innerHTML;
	if (b_title != "" && b_content != ""){
		$.ajax({
			type: "POST",
			url: modifyNodeURL,
			data: {b_number: sequenceNumber, b_content: b_content},
			success: (end) => {
			}
		});
		$.ajax({
			type: "POST",
			url: "board.modify.submit",
			data: {b_number: sequenceNumber, b_title: b_title},
			success: (result) => {
				location.href= `board.show.content?b_number=${sequenceNumber}`;
				alert(result["result"]);
			}
		});
	} else {
		alert("제목과 글 내용을 입력 해주세요.");
		document.getElementById('b_title').focus();
	}
}

