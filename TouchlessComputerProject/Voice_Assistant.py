import speech_recognition as sr
import datetime
import subprocess
import pywhatkit
import pyttsx3
import webbrowser

# Initialize text-to-speech engine
engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)

# Initialize speech recognizer
recognizer = sr.Recognizer()

def listen_to_command():
    """
    Listen to the user's voice and return the recognized command.
    """
    try:
        with sr.Microphone() as source:
            print("Clearing background noises... Please wait")
            recognizer.adjust_for_ambient_noise(source, duration=1)
            print('Listening... Speak now.')
            recordedaudio = recognizer.listen(source)  # Wait until user speaks
            text = recognizer.recognize_google(recordedaudio, language='en_US').lower()
            print('Your message:', text)
            return text  # Return the recognized text
    except sr.UnknownValueError:
        print("Didn't catch that. Please try again.")
        return None
    except Exception as ex:
        print(f"Error: {ex}")
        return None

def execute_command(command):
    """
    Process and execute the given command.
    """
    if not command:
        return  # No command to process

    if 'chrome' in command:
        response = 'Opening Chrome...'
        engine.say(response)
        engine.runAndWait()
        programName = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
        subprocess.Popen([programName])

    elif 'time' in command:
        current_time = datetime.datetime.now().strftime('%I:%M %p')
        print(f"The current time is {current_time}")
        engine.say(f"The current time is {current_time}")
        engine.runAndWait()

    elif 'play' in command:
        response = 'Playing on YouTube...'
        engine.say(response)
        engine.runAndWait()
        pywhatkit.playonyt(command)

    elif 'youtube' in command:
        response = 'Opening YouTube...'
        engine.say(response)
        engine.runAndWait()
        webbrowser.open('https://www.youtube.com')

    elif 'open this pc' in command or 'open my computer' in command:
        response = 'Opening This PC...'
        engine.say(response)
        engine.runAndWait()
        subprocess.Popen("explorer.exe shell:MyComputerFolder")

    elif 'exit' in command or 'stop' in command:
        response = 'Shutting down the voice assistant. Goodbye!'
        engine.say(response)
        engine.runAndWait()
        raise SystemExit  # Exit the program

    else:
        response = f"I didn't understand the command: {command}. Please try again."
        print(response)
        engine.say(response)
        engine.runAndWait()

def run_voice_assistant():
    """
    Run the voice assistant, continuously listening for commands.
    """
    print("Voice Assistant is now active. Say 'exit' to stop.")
    while True:
        command = listen_to_command()  # Get the user's command
        if command:  # If a command is recognized, process it
            execute_command(command)


if __name__ == '__main__':
    run_voice_assistant()