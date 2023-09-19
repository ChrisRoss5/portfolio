import os
import sys

directory = os.path.dirname(os.path.realpath(sys.argv[0]))  # current dir
print(directory)
for subdir, dirs, files in os.walk(directory):
  for filename in files:
    if filename.find('.svg') > 0:
      src = os.path.join(subdir, filename)
      new_filename = filename.replace(".svg", "SVG.vue")
      dst = os.path.join(subdir, new_filename)
      os.rename(src, dst)