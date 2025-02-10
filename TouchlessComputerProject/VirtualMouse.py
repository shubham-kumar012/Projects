import cv2
import mediapipe as mp
import pyautogui

# Mediapipe hand detection and drawing utilities
hand_detector = mp.solutions.hands.Hands()
drawing_utils = mp.solutions.drawing_utils
drawing_styles = mp.solutions.drawing_styles

def hand_gesture_control():
    """Function to control the mouse using hand gestures."""
    # Capture video
    cap = cv2.VideoCapture(1)
    screen_width, screen_height = pyautogui.size()

    while True:
        _, frame = cap.read()
        if not _:
            break

        # Flip and resize the frame
        frame = cv2.flip(frame, 1)
        frame = cv2.resize(frame, (1080, 720))
        frame_height, frame_width, _ = frame.shape

        # Convert the frame to RGB for mediapipe processing
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        output = hand_detector.process(rgb_frame)
        hands = output.multi_hand_landmarks

        if hands:
            for hand in hands:
                # Draw the hand landmarks
                drawing_utils.draw_landmarks(
                    frame, hand, mp.solutions.hands.HAND_CONNECTIONS,
                    drawing_styles.get_default_hand_landmarks_style(),
                    drawing_styles.get_default_hand_connections_style()
                )

                landmarks = hand.landmark
                for id, landmark in enumerate(landmarks):
                    index_tip = landmarks[8]
                    thumb_tip = landmarks[4]

                    x = int(landmark.x * frame_width)
                    y = int(landmark.y * frame_height)

                    index_x, index_y = int(index_tip.x * frame_width), int(index_tip.y * frame_height)
                    thumb_x, thumb_y = int(thumb_tip.x * frame_width), int(thumb_tip.y * frame_height)

                    # Move mouse with index finger (id 8)
                    if id == 8:
                        cv2.circle(img=frame, center=(x, y), radius=10, color=(0, 255, 255))
                        index_x = (screen_width / frame_width) * x
                        index_y = (screen_height / frame_height) * y
                        pyautogui.moveTo(index_x, index_y)

                    # Click with thumb and index finger proximity (id 4 for thumb tip)
                    if id == 4:
                        cv2.circle(img=frame, center=(x, y), radius=10, color=(0, 255, 255))
                        if abs(index_y - thumb_y) < 120:  # Adjust threshold as needed
                            print('Click detected')
                            pyautogui.click()
                            pyautogui.sleep(1)

        cv2.imshow("Hand Gesture Control", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):  # Press 'q' to exit
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    hand_gesture_control()
