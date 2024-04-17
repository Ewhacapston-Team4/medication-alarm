import sys
import requests
from bs4 import BeautifulSoup
import pandas as pd

def CombineTaboo(pillSeq):
    result_data_mix = list()

    for i in range(3):
        key = "NDY4F%2BZ3KM7why4fZ7kxeMoMsKUPDZULW3AGi2MBsbbCDbftlWdqpWspCKRgh8%2B3X802AreQijV0rQeD4seuFw%3D%3D"
        url = "http://apis.data.go.kr/1471000/DURPrdlstInfoService03/getUsjntTabooInfoList03?serviceKey="+str(key)+"&itemSeq=" + str(pillSeq) + "&pageNo="+str(i)

        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        itemList = soup.findAll('item')

        for item in itemList:
            name = item.find('mixture_item_name').text
            seq = item.find('mixture_item_seq').text
            result_data_mix.append((seq, name))

    result_df = pd.DataFrame(result_data_mix, columns=['품목번호', '병용금기약물'])
    return result_df

if __name__ == "__main__":
    pillSeq = sys.argv[1]
    result = CombineTaboo(pillSeq)
    print(result.to_string(index=False))
