# -*- coding:utf-8 -*-
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from konlpy.tag._okt import Okt

class AiAdFilter():
    
    def __init__(self):
        self.cv = CountVectorizer()
        self.mnb = MultinomialNB()
        self.okt = Okt()
        
    
    def trainAi(self, blogData):
        
        trainData = []
        label = []
        bd = None

        for bd in blogData:
            trainData.append(bd["cd_content"])
            label.append(bd["cd_label"])
        
        cvResult = self.cv.fit_transform(trainData).toarray()
        
        self.mnb.fit(cvResult, label)
        #main에서 mnbAi로 받을 것임
    
    
    def AiPredict(self, totalText):
        
        totalText = self.okt.normalize(totalText)
        totalText = self.okt.pos(totalText, stem=True)
        
        words = []
        
        for word, _ in totalText:
            words.append("%s " % word) 
            
        sentence = ["".join(words)]
        
        sentenceCvResult = self.cv.transform(sentence).toarray()
        
        result = self.mnb.predict(sentenceCvResult)[0]
        
        if result == "광고":
            result = "광고 의심"
            
        return result, sentence[0]
        
    def testOkt(self): 
        
        print(self.okt.normalize("준비 완료!"))
        
        
        