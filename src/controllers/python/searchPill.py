import sys
import requests
from bs4 import BeautifulSoup
import pandas as pd
import re

def searchPill(pillSeq):
    # 노인주의
    try:
        url = f"http://apis.data.go.kr/1471000/DURPrdlstInfoService03/getOdsnAtentInfoList03?serviceKey=NDY4F%2BZ3KM7why4fZ7kxeMoMsKUPDZULW3AGi2MBsbbCDbftlWdqpWspCKRgh8%2B3X802AreQijV0rQeD4seuFw%3D%3D&type=xml&itemSeq={pillSeq}"
        response = requests.get(url, verify=False)
        soup = BeautifulSoup(response.text, 'html.parser')
        temp = soup.findAll('totalcount')
        itemList = soup.findAll('item')
        name = ""

        for item in itemList:
            name = item.find('item_name').text
        if name != "":
            result1 = name + "은(는) 노인 주의 약물임"
        else :
            result1 = "노인 주의 약물 아님"
    
        # 용량주의
        csv = pd.read_csv('C:/Users/82104/Node_lecture/medication-alarm/src/controllers/python/용량주의.csv', names=['kor_name','eng_name','type','cap_per_day','alpha'])
        df = pd.DataFrame(csv)
        url = "http://apis.data.go.kr/1471000/DURPrdlstInfoService03/getCpctyAtentInfoList03?serviceKey=NDY4F%2BZ3KM7why4fZ7kxeMoMsKUPDZULW3AGi2MBsbbCDbftlWdqpWspCKRgh8%2B3X802AreQijV0rQeD4seuFw%3D%3D&type=xml&itemSeq=" + str(pillSeq)
        response = requests.get(url, verify=False)
        soup = BeautifulSoup(response.text, 'html.parser')
        count = soup.findAll('totalcount')
        itemList = soup.findAll('item')
        totalcount = len(count)

        mixtype = ""
        prohibit = ""
        for item in itemList:
            name = item.find('item_name').text
            seq = item.find('item_seq').text
            ingr = item.find('ingr_name').text
            mixtype = item.find('mix_type').text
            prohibit = item.find('prohbt_content').text
            mixIngr = item.find('mix_ingr').text

        if(mixtype != "" or prohibit != ""):
            # 단일인 경우 바로 출력 가능
            if mixtype == '단일':
                # 전체 행 중에서 해당 문자열이 포함된 행이 있는지 확인
                contains_str = df['kor_name'].str.contains(ingr)

                if contains_str.any():
                    # '복합제'를 포함하지 않는 행 중에서 ingr 포함된 위치 확인 <- 복합제 아니기 때문에 단일. 값 하나임.
                    index_where_contains = df[~df['alpha'].astype(str).str.contains('복합제') & contains_str].index.tolist()

                    idx = index_where_contains[0]
                    cap_per_day = df.loc[idx, 'cap_per_day']
                    result2 = cap_per_day + "/1일 이상 복용 주의"

            # 복합제인 경우
            else:
                # print("복합물")
                result2 = prohibit + "/1일 이상 복용 주의"
        else:
            result2 = "용량 주의 사항 없음"

        result = result1 + "\n" + result2

    except requests.exceptions.RequestException as e:
        result = f"오류 발생: {e}"
        return result

    return result

if __name__ == "__main__":
    pillSeq = sys.argv[1]
    result = searchPill(pillSeq)
    print(result)
