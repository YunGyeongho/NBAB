# -*- coding:utf-8 -*-
from bs4 import BeautifulSoup
import requests
import urllib.request
import pytesseract as pt
from PIL import Image
from io import BytesIO

class AdFilter:
    
    def __init__(self):
        self.header = {"User-agent": "Mozilla/5.0"}
        self.companyList = ['www.revu.net', 'mateb.kr', 'www.storyn.kr', 'www.mrblog.net', 'xn--939au0g4vj8sq.net', 'dinnerqueen.net', 'reviewjin.com', 'www.ringble.co.kr', 'www.cometoplay.kr', 'realview.kr', 'echoblog.net', 'www.seoulouba.co.kr', 'www.99das.com', '4blog.net', 'www.reviewplace.co.kr', 'www.seoulouba.kr', 'jaview.co.kr', 'lipple.co.kr', 'www.modublog.co.kr', 'www.fineadple.com', 'bqueens.net', 'tqueens.net', 'www.pick-me.kr', 'www.tble.kr', 'leyongblog.com', 'www.witchad.kr', 'www.kormedia.co.kr', 'chehumdan.com', 'www.sioneview.com', 'www.powerblogs.kr', 'reviewshare.io', 'www.real-review.kr', 'www.reviewus.co.kr', 'nugunablog.co.kr', 'reviewtong.co.kr', 'www.sayblog.co.kr', 'blog.naver.com']
        self.imgKeywordList = ['업체', '서비스', '식사권', '원고료', '소정', '받았지만', '받아', '받고', '포인트', '업제', '무상', '업처', '업세', '체험단', '광고주', '제작비', '이용권', '등록비', '원고류', '시비스', '수수료']
        self.keywordList = ['업체', '식사권', '원고료', '소정', '제공', '받았지만', '포인트', '무상', '광고주', '제작비', '이용권', '등록비', '수수료']
        

    def getMainFrameSrc(self, url):
        header = self.header
        req = requests.get(url, headers=header)
        bs = BeautifulSoup(req.text, "html.parser")
        realAddr = bs.select('#mainFrame')[0]["src"]
        
        return realAddr
    
    
    def getMainContainer(self, realAddr):
        header = self.header
        req = requests.get("https://blog.naver.com%s" % realAddr, headers=header)
        bs = BeautifulSoup(req.text, "html.parser")
        mainContainer = bs.select(".se-main-container")[0]
        
        return mainContainer
      
      
    def getImgSrcList(self, mainContainer):
        
        images = mainContainer.findAll("img")
        srcList = []
        no, i = None, None
        
        for no, i in enumerate(reversed(images)):
            if no == 3:
                break
            srcList.append(i["src"].replace("w80_blur", "w966"))
            
            
        return srcList
    
    
    def isInCompanyList(self, srcList):
        # 가져온 srcList로 반복문을 돌려 3개 중에 companyList에 포함되어 있다면 바로 True return 셋다 없다면 False 리턴
        companyList = self.companyList
        src = None
        
        for src in srcList:
            src = src.split("/")[2]
            if src in companyList:
                return  True
        
        return False
    
    
    def containsImgKeyword(self, srcList):
        # 가져온 srcList로 반복문을 돌려 img에서 text를 추출하고 imgKeywordList에 포함되어 있다면 바로 True를 return 셋다 없다면 False 리턴
        imgKeywordList = self.imgKeywordList
        header = self.header
        
        pt.pytesseract.tesseract_cmd, src, sentence, ik = None, None, None, None
        req, res = None, None
        
        for src in srcList:
            try:
                req = urllib.request.Request(src, headers= header)
                res = urllib.request.urlopen(req).read()
                pt.pytesseract.tesseract_cmd = R'C:\Program Files\Tesseract-OCR\tesseract'
                sentence = pt.image_to_string(Image.open(BytesIO(res)).convert("L"), lang='kor')
                
                for ik in imgKeywordList:
                    if sentence.__contains__(ik):
                        return True
        
            except Exception:
                continue
        return False
    
    
    def containsKeywordList(self, mainContainer):
        # 가져온 pList로 반복문을 돌려 text를 추출하고 keywordList에 포함 되어 있다면 바로 True를 return 셋 다 없다면 False 리턴
        keywordList = self.keywordList
        
        allP = mainContainer.select(".se-text-paragraph")
        p = None
        i = 0
        for p in reversed(allP):
            if i == 5:
                break
            if p.text != "\u200b" and p.text != " ":
                i += 1
                for kw in keywordList:
                    if p.text.__contains__(kw):
                        return True
        return False
    
