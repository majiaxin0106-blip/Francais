#!/usr/bin/env python3
import subprocess
import time
import os

# HTML文件路径
html_file = "/Users/majiaxin/Francais/intelligence-loop.html"
output_file = "/Users/majiaxin/Desktop/intelligence-loop-screenshot.png"

# 使用Safari打开HTML文件
print("正在打开HTML文件...")
subprocess.run(["open", "-a", "Safari", html_file])

# 等待浏览器加载
print("等待页面加载（5秒）...")
time.sleep(5)

# 使用screencapture命令截图（交互式选择窗口）
print("请在Safari窗口上点击以截图...")
subprocess.run(["screencapture", "-i", "-W", output_file])

print(f"截图已保存到: {output_file}")
