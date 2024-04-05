import sys
import numpy as np
from keras.preprocessing import image
from keras import models

def pill(imagePath):
    # 모델 로드
    loaded_model = models.load_model("C:/Users/82104/Node_lecture/medication-alarm/src/controllers/python")

    # 이미지 불러오기 및 전처리
    img = image.load_img(imagePath, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0

    # 예측 수행
    predictions = loaded_model.predict(img_array)

    # 예측된 클래스 인덱스
    predicted_class_index = np.argmax(predictions)

    # 클래스 인덱스로부터 클래스 레이블 얻기
    class_labels = list(train_generator.class_indices.keys())
    predicted_class_label = class_labels[predicted_class_index]

    # 예측 결과 출력
    print(f"예측된 알약 이름: {predicted_class_label}")

if __name__ == "__main__":
    imagePath = sys.argv[1]
    result = pill(imagePath)
    print(result)