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

# 모델 로드
loaded_model = models.load_model("C:/Users/82104/Node_lecture/medication-alarm/src/controllers/python/tri_pill_classification_model.h5")

# 구글 드라이브에서 특정 폴더의 폴더 리스트 가져오기
def list_folders(folder_id):
    try:
        results = drive_service.files().list(
            q=f"'{folder_id}' in parents and mimeType='application/vnd.google-apps.folder'",
            fields="files(name)"
        ).execute()
        items = results.get('files', [])
        folder_names = [item['name'] for item in items]
        return folder_names
    except Exception as e:
        print(f"Error listing folders: {e}")
        return []

def pill(image_path, label_list):
    try:
        # 이미지 불러오기 및 전처리
        img = load_img(image_path, target_size=(224, 224))
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0

        # 예측 수행
        predictions = loaded_model.predict(img_array)

        # 예측된 클래스 인덱스
        predicted_class_index = np.argmax(predictions)

        # 클래스 인덱스로부터 클래스 레이블 얻기
        predicted_class_label = label_list[predicted_class_index]

        # 예측 결과 반환
        return predicted_class_label
    except Exception as e:
        print(f"Error predicting image: {e}")
        return None
    
image_path = 'C:/Users/82104/Node_lecture/medication-alarm/src/controllers/uploads/51c13dac5a169d8345c16dcafae774de.png'
folder_id = "1u-qZjYX4WQNSheUejNDcg2KAE-um9wch"
folder_names = list_folders(folder_id)
print(folder_names)
