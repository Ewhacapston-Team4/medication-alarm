import sys
import requests
import json
import pandas as pd

def searchPill(pillName):
    url = f"http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?serviceKey=NDY4F%2BZ3KM7why4fZ7kxeMoMsKUPDZULW3AGi2MBsbbCDbftlWdqpWspCKRgh8%2B3X802AreQijV0rQeD4seuFw%3D%3D&pageNo=1&itemName={pillName}&type=json"
    result = ""

    try:
        response = requests.get(url, verify=False, timeout=3)
        response.raise_for_status()

        json_data = response.json()
        items = json_data['body']['items']
        dataframe = pd.DataFrame(items)

        # DataFrame을 문자열로 변환
        result = dataframe.to_string(index=False)

    except requests.exceptions.RequestException as e:
        result = f"오류 발생: {e}"

    return result

if __name__ == "__main__":
    pillName = sys.argv[1]
    result = searchPill(pillName)
    print(result)
