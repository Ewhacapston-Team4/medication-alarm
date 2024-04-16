import sys
import requests
from bs4 import BeautifulSoup
import pandas as pd

def searchPill(pillSeq):
    url = f"http://apis.data.go.kr/1471000/DURPrdlstInfoService03/getOdsnAtentInfoList03?serviceKey=NDY4F%2BZ3KM7why4fZ7kxeMoMsKUPDZULW3AGi2MBsbbCDbftlWdqpWspCKRgh8%2B3X802AreQijV0rQeD4seuFw%3D%3D&type=xml&itemSeq={pillSeq}"

    try:
        response = requests.get(url, verify=False)
        #contents = response.text

        soup = BeautifulSoup(response.text, 'html.parser')
        temp = soup.findAll('totalcount')
        itemList = soup.findAll('item')

        totalcount = len(temp)

        if(totalcount > 0):
            for item in itemList:
                name = item.find('item_name').text
                seq = item.find('item_seq').text
            result = name + "은(는) 노인 주의 약물임\n"

        else: result = "노인주의 아님"
        
    except requests.exceptions.RequestException as e:
        result = f"오류 발생: {e}"

    return result

if __name__ == "__main__":
    pillSeq = sys.argv[1]
    result = searchPill(pillSeq)
    print(result)
