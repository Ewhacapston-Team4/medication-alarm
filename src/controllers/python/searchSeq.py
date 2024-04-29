import sys
import pandas as pd

def searchSeq(pillName):
    name = pillName
    
    csv = pd.read_csv('C:/Users/82104/Node_lecture/medication-alarm/src/controllers/python/seq_name_img_class.csv', names=['seq', 'name', 'imgurl', 'class'])

    seq_for_name = csv.loc[csv['name'] == name, 'seq'].values
    ## img_for_name = csv.loc[csv['name'] == name, 'imgurl'].values

    if seq_for_name.size > 0 :
        return seq_for_name[0]
    else :
        return '존재하지 않는 알약'

if __name__ == "__main__":
    pillName = sys.argv[1]
    result = searchSeq(pillName)
    print(result)