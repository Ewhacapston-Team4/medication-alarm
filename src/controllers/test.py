import sys
import numpy as np
from PIL import Image
from keras.models import load_model
from keras.utils import load_img, img_to_array


# 훈련된 모델 경로
MODEL_FILE_PATH = "C:/Users/82104/Node_lecture/medication-alarm/src/controllers/pill_classification_model_mobilenetv2.h5"

image_path = "C:/Users/82104/Node_lecture/medication-alarm/src/controllers/uploads/2288f759ad755a278658f75c46e9d0bc.png"

# 모델 로드
loaded_model = load_model(MODEL_FILE_PATH)
    
# 이미지 불러오기 및 전처리
img = load_img(image_path, target_size=(224, 224))  # 모델에 맞는 크기로 변경
img_array = img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array /= 255.0

loaded_model.summary()

# 예측 수행
predictions = loaded_model.predict(img_array)

# 예측된 클래스 인덱스
predicted_class_index = np.argmax(predictions)

# 클래스 인덱스로부터 클래스 레이블 얻기
class_labels = {0: "class_0", 1: "class_1", 2: "class_2"}  # 클래스 인덱스에 해당하는 레이블 딕셔너리
predicted_class_label = class_labels.get(predicted_class_index, "Unknown")

# 예측 결과 출력
print(f"예측된 알약 이름: {predicted_class_label}")