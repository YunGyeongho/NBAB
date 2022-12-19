# -*- coding:utf-8 -*-
from flask.app import Flask
from flask import request
import ssl
import AAFAdFilter
import AAFNaiveBayes as an
import AAFDAO
import ResponseSet

app = Flask(__name__)

@app.route("/filter.judge.ai")
def getJudgeUseFilter():
    # 데이터가 없을 때 요청하는 주소
    try:
        url = request.args.get("url")
        
        mainContainer = af.getMainContainer(af.getMainFrameSrc(url))
        # API에서 응답 받은 url에서 mainFrameSrc를 가져오고 해당 src로 재요청을 하여 mainContainer 객체를 가져온다.
        # 실제 서버 구축 시 except에 continue가 아닌 들어온 요청에 "불가"와 같은 응답으로 대체해야 한다. 
        
        srcList = af.getImgSrcList(mainContainer)
        # 가져온 mainContainer에서 img 판독을 위한 srcList를 셋팅 해주는 함수를 부른다.
        
        if af.isInCompanyList(srcList):
            cm.insertUrl(url, ad)
            return rs.getResponse(adWrite)
        
        else:
            
            if af.containsImgKeyword(srcList):
                cm.insertUrl(url, ad)
                return rs.getResponse(adWrite)
                
            else:
                
                if af.containsKeywordList(mainContainer):
                    cm.insertUrl(url, ad)
                    return rs.getResponse(adWrite)
                
                else:
                    result, content = ai.AiPredict(mainContainer.text.replace("\n", " ").replace("\u200b", ""))
                    cm.insertWithContent(url, content, result)
                    if result == adAlert:
                        return rs.getResponse(adHigh)
                    else:
                        return rs.getResponse(adLow)
    except Exception:
        return rs.getResponse("판독 불가")
    # 1. 주 컨텐츠 내용이 담긴  div 객체의 className이 se-main-container가 아닌  postViewArea로 돼있는 경우가 있는데 이때 P객체 등의 class도 다르다.
    # 200개 중에 1개 있는 이를 잡아내기 위해 갈라지는 가지가 많아지는 것이  비효율 적이라고 느껴져 판독 불가로 처리하기로 했다.
    # 2. 이미지 판독을 위해 urllib.request.urlopen 기능을 이용하는데 이때 간혹 이미지 불러오는 것이
    # 불가능한 경우가 있으며 600개 데이터 중 1개 꼴이니 굳이 신경 쓰지 않기로 하였다. 
                        

@app.route("/judge.ai")
def getJudgeOnlyAi():
    # 데이터는 있지만 광고가 아닐 때 요청하는 주소
    try:
        url = request.args.get("url")
        blogData = cm.findContent(url)
        # 받아온 url을 통해 mongoDB 조회 해서 가져오고
        oldLabel = blogData[0]["cd_label"]
        # 광고 의심 혹은 비광고로 저장되어 있을 라벨을 미리 담아 놓음.
        totalText = blogData[0]["cd_content"]
        # 기존 분석 데이터도 담아준다.
        result, _ = ai.AiPredict(totalText)
        # 판정 요청, sentence는 필요 없기에 받지 않음.
        if oldLabel != result:
            cm.updateLabel(url, result)
        # 기존 라벨과 결과 값이 다를 때만 DB 저장 값 update.
        if result == adAlert:
            return rs.getResponse(adHigh)
        else:
            return rs.getResponse(adLow)
        
    except Exception:
        return rs.getResponse("판독 불가")
    # DB연결이 원활하지 않거나 기존 데이터가 있던 글이 현재는 비공개로 전환된 경우 판독 불가가 된다.
        



if __name__=="__main__":
    ssl.match_hostname = lambda cert, hostname: True
    ssl._create_default_https_context = ssl._create_unverified_context
    # except 방지를 위한 ssl 설정
    cm = AAFDAO.ConMongo("192.168.0.100")
    # mongoDB CRUD를 위한 Class
    rs = ResponseSet.responseSet()
    # 응답 객체 만들어주는 Class 불러옴.
    af = AAFAdFilter.AdFilter()
    # ad filter 객체 불러옴
    ai = an.AiAdFilter()
    # ai 객체 불러옴
    ai.trainAi(cm.getTrainContent())
    # ai 교육
    ai.testOkt()
    # okt 첫 구동시간이 오래 걸리기에 미리 한번 호출 함.
    ad = "광고"
    adWrite = "광고 기재"
    adHigh = "광고 확률 높음"
    adLow = "광고 확률 낮음"
    adAlert = "광고 의심"
    # 대조를 위한 String
    app.run("0.0.0.0", 6833, debug=True)