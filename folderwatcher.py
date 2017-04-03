import os
import time
import datetime

outold = []
try:
	while True:
		out = os.listdir()
		if outold != out:
			ldate= datetime.datetime.now().strftime('%I:%M:%S')
			for x in outold:
				if x not in out:
					print ('Moved:  '+ldate+'   '+x)
			for x in out:
				if x not in outold:
					print ('New:    '+ldate+'   '+x)
			outold = out
		time.sleep(1)
except KeyboardInterrupt:
    pass
