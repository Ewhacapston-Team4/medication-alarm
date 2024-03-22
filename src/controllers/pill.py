import os
import sys
import numpy as np
from PIL import Image
import tensorflow as tf
from keras.preprocessing import image


# 훈련된 모델 경로
MODEL_FILE_PATH = "pill_classification_model_mobilenetv2.h5"

# 모델 로드
loaded_model = tf.keras.models.load_model(MODEL_FILE_PATH)

# 테스트할 이미지 경로
test_image_path = image_path

# 이미지 불러오기 및 전처리
img = image.load_img(test_image_path, target_size=(299, 299))
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