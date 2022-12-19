var lamaVisiable = true;

function connectFoldMenuEvent() {
	$("#contentArea").click(function() {
		$("#loginAndMenuArea").css("left","-500px").css("opacity","0");
		lamaVisiable = true;
	})
}

function connectSummonLoginMenuEvent() {
	$("#startBtn").click(function() {
		if (lamaVisiable) {
			$("#loginAndMenuArea").css("left","0px").css("opacity","1");
		} else {
			$("#loginAndMenuArea").css("left","-500px").css("opacity","0");
		}
		lamaVisiable = !lamaVisiable;
	});
}

function showTitle() {
//	setInterval(콜백함수, 시간); 시간마다 함수를 반복적으로 자동호출
//	setTimeout(콜백함수, 시간); 시간지나면 함수 자동호출
	setTimeout(function(){
		$("#contentAreaTitle").css("opacity","1");
	}, 500);
	
}

function connectAnimateUDSNSEvent() {
	$(".snsDeleteBtn").mouseenter(function() {
		$(this).closest(".snsBoardPost").css("width","100%");
	});
	
	$(".snsDeleteBtn").mouseleave(function() {
		$(this).closest(".snsBoardPost").css("width","98%");
	});
	
	$(".snsUpdateBtn").mouseenter(function() {
		$(this).closest(".snsBoardPost").css("width","100%");
	});
	
	$(".snsUpdateBtn").mouseleave(function() {
		$(this).closest(".snsBoardPost").css("width","98%");
	});
	
}

function connectSNSPostColorChangeEvent() {
	// keydown
	// G~ 못쓰게
	$("#snsPostColorInput").keyup(function() {
		var c = $(this).val();
		$(".snsPostColor").css("color", c);
	});
}

function connectMemberJoinIDKeyEvent() {
	$("#memberJoinID").keyup(function() {
//		if (e.keyCode == 65) {
			// var ar = [1, 2, 3];
			// ar[0]
			
			// var h = {name:"홍", age:3};
			// h.name
			
			var id = $(this).val();
			$.getJSON("member.info.get?m_id=" + id, function(memberData) {
				
				if (memberData.member[0] == null) {
					$("#memberJoinID").css("color","blue");
				} else {
					$("#memberJoinID").css("color","red");
				}
			});
//		}
	});
}


function connectMemberJoinBCPWClickEvent() {
	var bcno = $(".bcpw").val();
	$(".bcpw").mousedown(function() {
//		$(this).val("820");
		var u = "http://192.168.0.141:8976/block.get2?no=" + bcno;
		$.getJSON(u, function(data) {
			$(".bcpw").val(data.number);
		})
		$(this).css("font-size", "15pt");
		$(this).css("border", "3px solid #BDBDBD");
	});

	$(".bcpw").mouseup(function() {
		$(this).val(bcno);
		$(this).attr("class","bcpwDone");
		$(this).css("font-size", "8pt");
	});
}

function connectMemberJoinAddrInputEvent() {
	$("#memberJoinAddr1, #memberJoinAddr2").click(function() {
		new daum.Postcode({
			onclose: function(state) {
				//state는 우편번호 찾기 화면이 어떻게 닫혔는지에 대한 상태 변수 이며, 상세 설명은 아래 목록에서 확인하실 수 있습니다.
				if(state === 'FORCE_CLOSE'){
					//사용자가 브라우저 닫기 버튼을 통해 팝업창을 닫았을 경우, 실행될 코드를 작성하는 부분입니다.
				} else if(state === 'COMPLETE_CLOSE'){
					//사용자가 검색결과를 선택하여 팝업창이 닫혔을 경우, 실행될 코드를 작성하는 부분입니다.
					//oncomplete 콜백 함수가 실행 완료된 후에 실행됩니다.
					alert(JSON.stringify(state));
				}
			},
	        oncomplete: function(data) {
	        	$("#memberJoinAddr1").val(data.zonecode);
	        	$("#memberJoinAddr2").val(data.roadAddress);
	        }
	    }).open();
	});
}


$(function() {
	connectAnimateUDSNSEvent();
	connectFoldMenuEvent();
	connectMemberJoinAddrInputEvent();
	connectMemberJoinBCPWClickEvent();
	connectMemberJoinIDKeyEvent();
	connectSNSPostColorChangeEvent();
	connectSummonLoginMenuEvent();
	showTitle();
});