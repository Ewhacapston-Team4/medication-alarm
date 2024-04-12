import sys
import numpy as np
from keras import models
from keras.utils import load_img, img_to_array
from google.oauth2 import service_account
from googleapiclient.discovery import build

# 구글 드라이브 api 인증 정보
credentials = service_account.Credentials.from_service_account_file(
    "C:/Users/82104/Node_lecture/medication-alarm/src/controllers/python/credentials.json",
    scopes=["https://www.googleapis.com/auth/drive"]
)

# 구글 드라이브 api 클라이언트 생성
drive_service = build('drive', 'v3', credentials=credentials)

# 구글 드라이브에서 특정 폴더의 폴더 리스트 가져오기
def list_folders(folder_id):
    folder_names = []
    page_token = None

    try:
        while True:
            # 페이지 크기 및 다음 페이지 토큰을 포함하여 API 요청
            results = drive_service.files().list(
                q=f"'{folder_id}' in parents and mimeType='application/vnd.google-apps.folder'",
                fields="nextPageToken, files(name)",
                pageSize=100,  # 한 번에 가져올 폴더 수 조정
                pageToken=page_token
            ).execute()

            # 결과에서 폴더 이름 추출하여 리스트에 추가
            items = results.get('files', [])
            folder_names.extend([item['name'] for item in items])

            # 다음 페이지 토큰이 있는 경우 다음 페이지 호출을 위해 설정
            page_token = results.get('nextPageToken')
            if not page_token:
                break  # 다음 페이지 토큰이 없으면 종료

        return sorted(folder_names)
    
    except Exception as e:
        print("폴더 목록을 가져오는 중 오류 발생:", e)
        return[]

def pill(image_path, label_list, poly):
    # 모델 로드
    if poly == "tri" :
        loaded_model = models.load_model("C:/Users/82104/Node_lecture/medication-alarm/src/controllers/python/tri_pill_classification_model.h5")
    elif poly == "pent" :
        loaded_model = models.load_model("C:/Users/82104/Node_lecture/medication-alarm/src/controllers/python/pent_pill_classification_model.h5")

    img = load_img(image_path, target_size=(224, 224))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0

    predictions = loaded_model.predict(img_array, verbose = 0)
    predicted_class_index = np.argmax(predictions)
    
    if predicted_class_index < len(label_list):
        predicted_class_label = label_list[predicted_class_index]
    else:
        predicted_class_label = "알 수 없음"  # 인덱스 오류 gracefully 처리
    
    return predicted_class_label

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script.py <image_path>")
        sys.exit(1)
    
    image_path = sys.argv[1]
    poly = sys.argv[2]
    if poly == "tri" :
        folder_id = "1u-qZjYX4WQNSheUejNDcg2KAE-um9wch"
    elif poly == "pent" :
        folder_id = "1iUBHNts466CMVH_dzfzfqEWNhLSgd-nn"
        
    folder_names = list_folders(folder_id)

    if not folder_names:
        print("Error: Failed to retrieve folder names from Google Drive.")
        sys.exit(1)
    
    result = pill(image_path, folder_names, poly)

    if result is not None:
        print(result)
    else:
        print("Error: Image classification failed.")
        sys.exit(1)
