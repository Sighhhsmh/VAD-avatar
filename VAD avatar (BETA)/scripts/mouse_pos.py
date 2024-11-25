import pyautogui
import asyncio
import websockets

async def send_mouse_coordinates(websocket, path):
    prev_x, prev_y = None, None

    try:
        while True:
            x, y = pyautogui.position()

            if (x != prev_x or y != prev_y):
                await websocket.send(f"{x},{y}")
                prev_x, prev_y = x, y

            await asyncio.sleep(0)  # Adjust delay as needed

    except websockets.exceptions.ConnectionClosedOK:
        print("Connection closed.")

start_server = websockets.serve(send_mouse_coordinates, "localhost", 8008)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
