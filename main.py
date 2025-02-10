import threading
import Voice_Assistant  # Voice Assistant module
import VirtualMouse  # Hand gesture module
import time

# Function to run the voice assistant
def run_voice_assistant():
    Voice_Assistant.run_voice_assistant()

# Function to run the hand gesture control
def run_hand_gesture():
    VirtualMouse.hand_gesture_control()

# Main function to start both functionalities
if __name__ == '__main__':
    # Create threads for voice assistant and hand gesture control
    voice_thread = threading.Thread(target=run_voice_assistant, daemon=True)
    gesture_thread = threading.Thread(target=run_hand_gesture, daemon=True)

    # Start both threads
    gesture_thread.start()
    voice_thread.start()

    # Keep the main program running
    while True:
        try:
            time.sleep(1)  # Keep the main thread alive
        except KeyboardInterrupt:
            print("Exiting program...")
            break

    # Keep the main program alive until gesture thread ends
    gesture_thread.join()
