import os
import sys

directory = os.path.dirname(os.path.realpath(sys.argv[0])) #get the directory of your script
for subdir, dirs, files in os.walk(directory):
 for filename in files:
  if filename.find('.vue') > 0:
   subdirectoryPath = os.path.relpath(subdir, directory) #get the path to your subdirectory
   filePath = os.path.join(subdirectoryPath, filename) #get the path to your file
   newFilePath = filePath.replace(".jpg",".jpeg") #create the new name
   if (newFilePath[0] == "."):
    newFilePath = newFilePath[:2].lower() + newFilePath[2:].capitalize();
    print(newFilePath)
    os.rename(filePath, newFilePath) #rename your file