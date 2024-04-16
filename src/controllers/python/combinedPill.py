import sys
import requests
from bs4 import BeautifulSoup
import pandas as pd

def CombineTaboo(pillSeq):
    result_data_mix = list()

    for i in range(30):
        key = "NDY4F%2BZ3KM7why4fZ7kxeMoMsKUPDZULW3AGi2MBsbbCDbftlWdqpWspCKRgh8%2B3X802AreQijV0rQeD4seuFw%3D%3D"
        url = "http://apis.data.go.kr/1471000/DURPrdlstInfoService03/getUsjntTabooInfoList03?serviceKey="+str(key)+"&itemSeq=" + str(pillSeq) + "&pageNo="+str(i)

        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        itemList = soup.findAll('item')

        name_list = []
        seq_list = []

        for item in itemList:
            name = item.find('mixture_item_name').text
            seq = item.find('mixture_item_seq').text
            name_list.append(name)
            seq_list.append(seq)

        for seq, name in zip(seq_list, name_list):
            row_data = [seq, name]
            result_data_mix.append(row_data)

    result_df = pd.DataFrame(result_data_mix, columns=['품목번호', '병용금기약물'])
    result = result_df

    return result

if __name__ == "__main__":
    pillSeq = sys.argv[1]
    result = CombineTaboo(pillSeq)
    print(result)
