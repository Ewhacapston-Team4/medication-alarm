import sys
import pandas as pd

def searchSeq(pillName):
    name = pillName
    
    csv = pd.read_csv('C:/Users/82104/Node_lecture/medication-alarm/src/controllers/python/seq_name_img.csv', names=['seq', 'name', 'imgurl'])

    seq_for_name = csv.loc[csv['name'] == name, 'seq'].values
    ## img_for_name = csv.loc[csv['name'] == name, 'imgurl'].values

    return seq_for_name[0]

if __name__ == "__main__":
    pillName = sys.argv[1]
    result = searchSeq(pillName)
    print(result)