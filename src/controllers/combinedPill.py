import sys
import requests
from bs4 import BeautifulSoup
import pandas as pd

def getTabooList(pillSeq):
    result_data = []

    for i in range(30):
        key = "NDY4F%2BZ3KM7why4fZ7kxeMoMsKUPDZULW3AGi2MBsbbCDbftlWdqpWspCKRgh8%2B3X802AreQijV0rQeD4seuFw%3D%3D"
        url = f"<http://apis.data.go.kr/1471000/DURPrdlstInfoService03/getUsjntTabooInfoList03?serviceKey={key}&typeName=%EB%B3%91%EC%9A%A9%EA%B8%88%EA%B8%B0&itemName=%EC%94%A8%EC%BD%94%EB%82%98%EC%A1%B8%EC%A0%95(%EC%9D%B4%ED%8A%B8%EB%9D%BC%EC%BD%94%EB%82%98%EC%A1%B8)&itemSeq={pillSeq}&pageNo={i}>"

        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        itemList = soup.findAll('item')

        for item in itemList:
            name = item.find('mixture_item_name').text
            seq = item.find('mixture_item_seq').text
            result_data.append([seq, name])

    result_df = pd.DataFrame(result_data, columns=['MIXTURE_ITEM_SEQ', 'MIXTURE_ITEM_NAME'])
    return result_df.to_json(orient='records')

if __name__ == "__main__":
    pillSeq = sys.argv[1]
    result = getTabooList(pillSeq)
    print(result)
