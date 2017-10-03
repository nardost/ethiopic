#!/bin/python
import keyboard
while(True):
    keyboard.add_hotkey('page up, page down', lambda: keyboard.write('foobar'))

